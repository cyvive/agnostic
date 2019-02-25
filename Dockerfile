FROM sotekton/basal:nodejs

COPY . /lib/app

WORKDIR /lib/app

RUN npm ci --production
