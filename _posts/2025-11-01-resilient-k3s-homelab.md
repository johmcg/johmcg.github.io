---
layout: post
title: "Project Log: Building a Resilient K3s Lab from the Ground Up"
author: John McGee
date: 2025-11-01 21:49:40 -0400
categories: [kubernetes, virtualization, networking, homelab]
---
In modern IT, deploying a highly-available, multi-node application platform is a fundamental skill. My goal for this personal lab was to move past single-machine testing and build a functional, resilient Kubernetes cluster (K3s) using enterprise-grade virtualization.

This post documents the configuration challenges and the successful deployment of a high-availability K3s cluster on a virtualized foundation.

## The Challenge: Ensuring Consistency and High Availability

The foundation of my lab was built on **Hyper-V** to create the necessary compute resources. This initial, manual setup presented three immediate challenges:

1.  **Consistency:** Manually configuring two separate **Debian VMs** (one master, one worker) meant ensuring network settings, firewall rules, and necessary **Docker** runtime components were identical and correct on both.
2.  **High Availability (HA) Setup:** Deploying K3s requires a precise multi-node process: installing the master server, securely retrieving the join token, and then using that token to join the worker node. Performing this manually demands strict attention to detail.
3.  **Application Delivery:** The final platform needed to securely host services like **remote access tools** and **media management servers** (e.g., **Guacamole** and **Jellyfin**).

## The Solution: Precision Configuration and Orchestration

The project was executed by meticulously configuring the **Hyper-V** virtual network, followed by precise Linux and Kubernetes installation steps.

### 1. The Virtual Infrastructure (Hyper-V & Debian)

Using **Hyper-V**, I provisioned the necessary **Debian** host VMs. This provided control over the underlying hardware resources (CPU, RAM, storage) and the virtual network topology.

* **Host Consistency:** Every setting was verified manually against a defined standard before the K3s installation began.
* **Networking:** The VMs were configured to use specific static IP addresses, which was critical for the K3s cluster communication and the subsequent networking setup.

### 2. K3s Deployment and Verification

With the base OS stable, the installation of K3s was performed manually using official installation scripts and commands.

* **Control Plane Deployment:** The primary master node (`deb3`) was initialized with the necessary K3s server components.
* **Worker Node Joining:** The secure join token was retrieved from the master and used to join the worker node (`deb4`), ensuring it could register and communicate with the control plane.
* **Verification:** The successful result was confirmed via the Kubernetes command line:
    > `deb3` was confirmed as the **control-plane,master**
    > `deb4` was confirmed as the **Ready** worker node

### 3. Securing and Accessing Hosted Services (WireGuard & NPM)

The final operational K3s cluster was then used to deploy containers for key homelab functions, with secure access layers placed in front of them:

* **Services:** Essential containers for services like **remote access** and **media management** were deployed to the cluster.
* **Secure Access (VPN):** A **WireGuard VPN** was configured to provide a fast, modern, and encrypted tunnel for remote connections into the lab network.
* **Service Routing (Reverse Proxy):** **Nginx Proxy Manager (NPM)** was set up to efficiently manage SSL certificates and route external traffic securely to the internal services running on the cluster.

## Technical Takeaways

This project successfully overcame the challenges of manual multi-node configuration on a virtualization platform. It demonstrates hands-on proficiency in the core skills necessary for any modern operations role:

* **Virtualization:** Deep familiarity with provisioning and networking on **Hyper-V**.
* **Container Orchestration:** Deploying and managing a stable, multi-node **K3s** cluster.
* **Networking/Security:** Implementing and administering a **WireGuard VPN** for secure remote access.
* **Application Delivery:** Configuring **Nginx Proxy Manager (NPM)** to handle reverse proxy and SSL termination for applications.
* **Linux Systems Administration:** Hands-on command-line expertise required for precise system configuration on Debian.
