# syntax=docker/dockerfile:1

FROM python

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN apt-get update
RUN apt-get -y upgrade
RUN pip install --upgrade pip
RUN apt-get install -y gcc
RUN apt-get install -y libxml2
RUN pip install --upgrade setuptools
RUN pip3 install -r requirements.txt
COPY . .
CMD ["gunicorn","-w","1","-b","0.0.0.0:8000","wsgi:app","--threads","12"]
#CMD ["gunicorn","--certfile","rootCA.crt.pem","--keyfile","rootCA.key.pem","-b","0.0.0.0:8000","wsgi:app"]
