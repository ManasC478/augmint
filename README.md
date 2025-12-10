# augmint

## Install Bun
[https://bun.sh/docs/installation](https://bun.com/docs/installation)

## Clone project
```
git clone https://github.com/ManasC478/augmint.git
cd augmint
```

## Server
```
cd server
```
### Setup python virtual environment
```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
### Run server
Always activate the virtual environment before running the server.
Before running server ask Manas for the `.env` and `client_secret.json` files. You will put both these files inside the `server/` folder.
Run server:
```
python run.py
```
### Activate virtual environment
```
source venv/bin/activate
```
### Deactivate virtual environment
```
deactivate
```

## B2B Client
You must have server running in order to run the b2b client.

### Setup
```
cd b2b-client
bun install
```

### Run
Before running b2b client ask Manas for the `.env` file. You will put the file inside `b2b-client/` folder.
```
bun run dev
```

## B2C Client
Incomplete.
