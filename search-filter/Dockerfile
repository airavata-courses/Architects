FROM ubuntu:latest
MAINTAINER Deepak Hanumanthaiah "dhanuman@iu.edu"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /index
WORKDIR /index
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["index.py"]
