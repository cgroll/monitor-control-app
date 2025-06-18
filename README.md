# React.js App for Raspberry Pi

This repository contains the code for a React.js application intended to run on multiple Raspberry Pi devices. This `README.md` provides instructions for development, local deployment, Docker containerization, and Raspberry Pi-specific configurations.

---

## 🚀 Getting Started

### Running the App Locally (Development Environment)

Follow these steps to get the application running on your local machine for development purposes.

1.  **Clone the repository:**
    ```bash
    git clone your-repo-url.git
    cd your-repo-name
    ```
2.  **Install dependencies:**
    It's recommended to run `npm install` at the parent level but also in both subdirectories `frontend` and `backend` to ensure all necessary packages for both frontend and backend are installed.
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory. The required environment variables will depend on your backend service configuration:

    In the current version the app simply sends an API post request to localhost, so no credentials are required.
    
    For using external services (e.g., Telegram notifications):
    ```
    # backend/.env
    TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
    TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
    ```
    *Replace `YOUR_TELEGRAM_BOT_TOKEN` and `YOUR_TELEGRAM_CHAT_ID` with your actual (dummy) values.*
4.  **Start the application:**
    ```bash
    npm start
    ```
    The application should now be accessible in your web browser, typically at `http://localhost:3000`.

---

## 🐳 Dockerization

Docker provides a consistent environment for running your application, ensuring it behaves the same way across different machines.

### Building and Running Docker on Ubuntu (x86-64 Architecture)

These instructions are for building and running Docker containers on an Ubuntu machine with an x86-64 processor.

1.  **Build the Docker image:**
    This command creates a Docker image named `ubuntu:latest` from your application's `Dockerfile`.
    ```bash
    docker build -t ubuntu:latest .
    ```
2.  **Run the Docker container:**
    This command runs the Docker image in detached mode (`-d`), maps port 8080 on your host to port 3000 in the container (`-p 8080:3000`), and passes environment variables for the backend.
    ```bash
    docker run \
      -d \
      -p 8080:3000 \
      -e TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN \
      -e TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID \
      ubuntu:latest
    ```
    *Access the app by navigating to `http://localhost:8080` in your web browser.*

---

## 🍓 Raspberry Pi Deployment

Deploying on a Raspberry Pi involves specific considerations due to its ARM architecture.

### Running the App Locally on a Raspberry Pi (Development Mode)

You can run the app directly on your Raspberry Pi without Docker for development and testing.

1.  **Clone the repository and install dependencies:**
    Follow the same steps as for local development on Ubuntu.
    ```bash
    git clone your-repo-url.git
    cd your-repo-name
    npm install
    ```
2.  **Provide Credentials:**
    Ensure your `.env` file in the `backend/` directory contains the necessary credentials as described in the "Running the App Locally" section.
3.  **Start the application:**
    ```bash
    npm start
    ```
    The application will typically be available at `http://localhost:3000` on your Raspberry Pi.

### Running the App in Kiosk Mode on Raspberry Pi

For dedicated displays, you'll often want the application to run in a full-screen, browser-based kiosk mode.

1.  **Start the React app without opening a browser automatically:**
    ```bash
    BROWSER=none npm start
    ```
2.  **Launch Chromium in Kiosk Mode:**
    Once the React app is running, open a new terminal or SSH session on your Raspberry Pi and execute the following command:
    ```bash
    chromium-browser --kiosk --disable-infobars http://localhost:3000
    ```
    This will open the Chromium browser in full-screen kiosk mode, displaying your application.

### ARM Architecture and Docker

**Important Note on ARM Architecture:** Docker containers built on an x86-64 architecture (like most Ubuntu desktop machines) are **not compatible** with ARM-based devices like the Raspberry Pi. You cannot simply copy a Docker image built on Ubuntu to a Raspberry Pi and expect it to run. This is because the underlying CPU instruction sets are different.

To run a Docker container on a Raspberry Pi, you must **build the Docker image directly on a Raspberry Pi** (or use a multi-architecture build system like Buildx).

### Building and Running Docker on a Raspberry Pi (ARM Architecture)

1.  **Build the Docker image on the Raspberry Pi:**
    Navigate to your application's root directory on the Raspberry Pi and run:
    ```bash
    docker build -t raspi:latest .
    ```
    This will create an ARM-compatible Docker image named `raspi:latest`.
2.  **Run the Docker container on the Raspberry Pi:**
    ```bash
    docker run \
      -d \
      -p 8080:3000 \
      -e TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN \
      -e TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID \
      raspi:latest
    ```
    The application will be accessible at `http://your-raspi-ip-address:8080`.

### Running Docker Container in Kiosk Mode on Raspberry Pi

To have your Dockerized application run in kiosk mode:

1.  **Ensure your Docker container is running** as described in the previous section.
2.  **On the Raspberry Pi, launch Chromium in Kiosk Mode, pointing to the Docker container's exposed port:**
    ```bash
    chromium-browser --kiosk --disable-infobars http://localhost:8080
    ```
    This assumes your Docker container is exposing port 8080 on the Raspberry Pi's `localhost` interface.

---

## 📡 Connecting to Your Raspberry Pi

Here are common methods for interacting with your Raspberry Pi from your development machine.

### Connecting via SSH from Terminal

SSH (Secure Shell) allows you to remotely access your Raspberry Pi's terminal.
```bash
ssh pi@192.168.178.46
```
*Replace `pi` with your Raspberry Pi's username and `192.168.178.46` with its actual IP address.*

### Accessing Raspberry Pi File System with SFTP (Ubuntu File Explorer)

You can easily browse and manage files on your Raspberry Pi using SFTP directly from your Ubuntu file explorer (Nautilus).

1.  Open your file explorer.
2.  In the left sidebar, click "Other Locations" (or similar).
3.  In the "Connect to Server" field, type:
    ```
    sftp://pi@192.168.178.46
    ```
    *Replace `pi` and the IP address as before.*
4.  You will be prompted for your Raspberry Pi's password. After successful authentication, its file system will be mounted and accessible.

### Connecting to Raspberry Pi in VSCode

VSCode's Remote - SSH extension allows you to open folders on your Raspberry Pi directly within VSCode, enabling seamless development.

1.  **Install the "Remote - SSH" extension** in VSCode.
2.  Open the **Command Palette** (Ctrl+Shift+P or Cmd+Shift+P).
3.  Type `Remote-SSH: Connect to Host...` and select it.
4.  Enter your SSH connection string (e.g., `pi@192.168.178.46`).
5.  VSCode will connect to your Raspberry Pi and open a new VSCode window where you can open folders and work on files as if they were local.

---

## 🦊 Connecting to GitHub Repo

To interact with this GitHub repository, you'll typically use either SSH or HTTPS.

### Connecting using SSH (Ubuntu)

This method requires you to have an SSH key configured with your GitHub account.

1.  **Generate an SSH key** (if you don't have one):
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
    Follow the prompts.
2.  **Add your SSH key to the ssh-agent:**
    ```bash
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
    ```
3.  **Add your public SSH key to your GitHub account settings.** (See GitHub documentation for detailed steps).
4.  **Clone the repository using the SSH URL:**
    ```bash
    git clone git@github.com:your-username/your-repo-name.git
    ```

### Connecting using HTTPS with a GitHub Authentication Token

This method is useful if you prefer not to use SSH or are on a machine where SSH setup is cumbersome.

1.  **Generate a Personal Access Token (PAT) on GitHub:**
    * Go to GitHub Settings -> Developer settings -> Personal access tokens -> Tokens (classic) -> Generate new token (classic).
    * Give it a descriptive name (e.g., "Raspberry Pi App Access").
    * Set the **expiration** appropriately.
    * Grant it **`repo`** scope (full control of private repositories) and specifically **`repo:status`, `repo_deployment`, `public_repo`** for read/write access to content.
    * **Copy the generated token immediately!** You won't be able to see it again.
2.  **Clone the repository using the HTTPS URL:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
3.  When you perform `git push`, `git pull`, or `git clone` for the first time, Git will prompt you for your username and password.
    * For the username, enter your GitHub username.
    * For the password, **enter your Personal Access Token** (PAT) that you generated.

---

## ⚙️ Important Docker Commands

These commands are essential for managing your Docker containers.

* `docker ps`: Lists all running Docker containers. Add `-a` to see all containers (running and stopped).
* `docker logs [CONTAINER_ID_OR_NAME]`: Displays the logs of a specific container, useful for debugging.
* `docker stop [CONTAINER_ID_OR_NAME]`: Stops a running container gracefully.
* `docker rm [CONTAINER_ID_OR_NAME]`: Removes a stopped container.
* `docker exec -it [CONTAINER_ID_OR_NAME] sh`: Executes a command (in this case, opens a shell) inside a running container, allowing you to interact with its environment.

