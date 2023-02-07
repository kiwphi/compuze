#!/bin/bash

session1='SERVERS'
session2='CODE'

##### SERVERS SESSION
tmux new-session -d -s $session1

# DOCKER
tmux rename-window -t 0 'docker'
tmux send-keys -t $session1:0 'docker-compose -f mariadb.yaml up' C-m
sleep 10
tmux split-window -h
tmux send-keys -t $session1:0.1 'docker exec -it mariadb_compuze /bin/bash' C-m

# SERVERS
tmux new-window -t $session1:1 -n 'node/next'
tmux send-keys -t $session1:1 'cd backend' C-m
tmux send-keys -t $session1:1 'npm install && npm run dev' C-m
tmux split-window -h
tmux send-keys -t $session1:1.1 'cd frontend' C-m
tmux send-keys -t $session1:1.1 'npm install && npm run dev' C-m

##### CODE SESSION
tmux new-session -d -s $session2

# BACKEND CODE
tmux rename-window -t 0 'backend'
tmux send-keys -t $session2:0 'cd backend' C-m
tmux send-keys -t $session2:0 'nvim' C-m

# FRONTEND CODE
tmux new-window -t $session2:1 -n 'frontend'
tmux send-keys -t $session2:1 'cd frontend' C-m
tmux send-keys -t $session2:1 'nvim' C-m

# ATTACH
tmux a
