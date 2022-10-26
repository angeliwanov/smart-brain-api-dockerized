FROM node:18.11.0

WORKDIR /Users/angelivanov/smart-brain-api

COPY ./ ./

RUN npm install --legacy-peer-deps

CMD ["/bin/bash"]
