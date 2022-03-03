![Elo Elevation (2)](https://user-images.githubusercontent.com/68365410/156670485-9c582f83-bd24-42ab-8226-40357b790c11.png)
# Project Overview
Elo Elevation is a chess training application that uses spaced repetition to help the user drill common patterns and positions to more easily identify opportunities in games. Our application aims to streamline the learning curve of identifying positional advantages. The app is currently in open beta and can be found [here](https://www.eloelevation.com/). 

In the first four moves of chess, there are 318,979,564,000 different combinations of moves. 
As frequent chess players, we noticed that after months and years of casually using the available tools in the market, our Elo ratings had marginally increased. Modern chess tools have tremendous reliance on self-directed learning. The problem is that most chess players don’t have an in-depth enough understanding of their own playstyle to know where their skills might be lacking. This leads to another problem, which is wasted time reading, watching, and doing exercises that don’t actually build the user's skills. This also causes high levels of attrition at various levels of the game. 

Elo Elevation is designed to condense the clutter and ambiguity of other chess training tools to dynamically deliver puzzles and exercises that users will immediately be able to implement in their games. It has millions of puzzles sorted into common patterns that are categorized and delivered dynamically to the user based on their performance and skill level. 

In an effort to learn full-stack development to gain a better understanding of modern web apps, we built this app in ReactJS, with a Python backend that leverages FastAPI to quickly spin up a REST API. A Postgresql database stores user data, which is limited to the most basic data required to track improvement and performance over time. The API and database are deployed via a docker container to a digital ocean droplet (cloud server). A Nginx reverse proxy is also employed in front of the API for security and rate-limiting


# Project Screenshots

![Readme_recording2](https://user-images.githubusercontent.com/68365410/156669773-4118bfc0-115d-47bd-8eaa-085b15803da1.gif)

Try it out!
[Beta Site](https://chess-app-frontend.vercel.app/)
