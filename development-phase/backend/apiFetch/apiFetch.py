from time import sleep, time
from xxlimited import new
from dotenv import dotenv_values
import requests


class Api:
    _key = dotenv_values(".env")
    _key = _key["key"]
    _apiMap = {}
    _mainApiMap = {}
    _url = "https://newscatcher.p.rapidapi.com/v1/latest_headlines"
    _headers = {
        "X-RapidAPI-Key": str(_key),
        "X-RapidAPI-Host": "newscatcher.p.rapidapi.com"
    }

    def _newCatcherRunner(self, title):
        querystring = {"topic": title, "lang": "en",
                       "media": "True", "country": "IN"}
        respone = requests.request(
            "GET", url=self._url, headers=self._headers, params=querystring)
        respone = respone.json()
        retArr = []
        for x in respone["articles"]:
            newJson = {}
            newJson["url"] = x["link"]
            newJson["title"] = x["title"]
            newJson["img"] = x["media"]
            newJson["topic"] = x["topic"]
            newJson["date"] = x["published_date"]
            retArr.append(newJson)
        return retArr

    def _topHeadlinesFetcher(self):
        url = "https://google-news.p.rapidapi.com/v1/top_headlines"
        querystring = {"lang": "en", "country": "IN"}
        headers = {
            "X-RapidAPI-Key": self._key,
            "X-RapidAPI-Host": "google-news.p.rapidapi.com"
        }
        respone = requests.request(
            "GET", url=url, headers=headers, params=querystring)
        respone = respone.json()
        retArr = []
        for x in respone["articles"]:
            newJson = {}
            newJson["url"] = x["link"]
            newJson["date"] = x["published"]
            newJson["title"] = x["title"]
            newJson["topic"] = "headline"
            retArr.append(newJson)
        self._apiMap["headline"] = retArr
        print(self._apiMap["headline"])

    def _newsCatcherApiFetcher(self):
        arr = ["sport", "tech", "world", "finance", "politics", "business",
               "economics", "entertainment", "beauty", "travel", "music", "food", "science"]
        for x in arr:
            self._apiMap[x] = self._newCatcherRunner(x)

    def cricketFetcher(self):
        url = "https://cricbuzz-cricket.p.rapidapi.com/news/v1/index"
        headers = {
	        "X-RapidAPI-Key": self._key,
	        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
        }
        response = requests.request("GET", url, headers=headers) 
        response=response.json()
        response=response["storyList"]
        retArr=[]
        for x in response:
            try:
                x=x["story"]
                newJson={}
                newJson["url"]=f'https://www.cricbuzz.com/cricket-news/{x["id"]}/newsTrakcer'
                newJson["title"]=x["hline"]
                newJson["image"]=f'https://www.cricbuzz.com/a/img/v1/500x500/i1/c{x["id"]}/abc.jpg'
                newJson["date"]=x["pubTime"]
                newJson["topic"]="cricket"
                retArr.append(newJson)
            except:
                pass
        self._apiMap["cricket"]=retArr
        print(self._apiMap["cricket"])
a = Api()
a.cricketFetcher()
