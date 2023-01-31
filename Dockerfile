FROM timbru31/node-alpine-git:16  as build-stage
ARG VITE_URL
ENV VITE_URL=$VITE_URL
WORKDIR /code
ADD package.json /code/
RUN npm install --registry=https://registry.npm.taobao.org

ADD . /code
RUN npm run docs:build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /code/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]