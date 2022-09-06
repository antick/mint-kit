FROM node:16-alpine3.15

#ENV NODE_ENV production

RUN mkdir -p /home/mint-kit
RUN chown node /home/mint-kit

USER node

WORKDIR /home/mint-kit
COPY --chown=node package*.json ./

RUN npm install
#RUN npm ci --only=production

COPY --chown=node . /home/mint-kint

ENV PATH /home/mint-kint/node_modules/.bin:$PATH
ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]
