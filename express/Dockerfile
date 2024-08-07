FROM node:16-alpine3.15

#ENV NODE_ENV production

RUN mkdir -p /home/mint-express
RUN chown node /home/mint-express

USER node

WORKDIR /home/mint-express
COPY --chown=node package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY --chown=node . /home/mint-express

ENV PATH /home/mint-express/node_modules/.bin:$PATH
ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]
