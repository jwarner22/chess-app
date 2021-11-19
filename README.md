# Learning Chess Made Simple!
We created this app because we love chess and wanted an easy and painless way to learn and improve. Traditional chess education requires significant self-direction and a huge amount of effort. Our goal is to create the simplest platform to learn and improve your chess.

We also wanted to learn full stack development to gain a better understanding of modern web apps. We built this app in React, with a Python backend that leverages FastAPI to quickly spin up a REST api. A postgresql database stores user data, which is limited to the most basic data required to track improvement and performance over time. The api and database are deployed via a docker container to a digital ocean droplet (cloud server). A nginx reverse proxy is also employed in front of the api for security and rate-limiting.

Beta Site (try it out!): chess-app-frontend.vercel.app
