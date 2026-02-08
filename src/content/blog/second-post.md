---
title: 'WSL Environment Setup'
description: 'WSL Environment Setup'
pubDate: '2026-02-09'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

# WSL Environment Setup Guide

## Initial Configuration via PowerShell

### Set WSL 2 as the Default Version

Execute the following command to ensure that all future Linux installations utilize the WSL 2 architecture by default.

```powershell
wsl --set-default-version 2

```

### List Available Distributions

To view a list of Linux distributions currently available for online installation, use the command below:

```powershell
wsl --list --online

```

### Install a Specific Distribution

To install your preferred distribution, replace `<Distro>` with the name identified in the previous step.

```powershell
wsl.exe --install <Distro>

```

---

## Backup and Exporting

### Exporting a Distribution

You can create a full backup of your environment by exporting it to a `.tar` archive. This is highly recommended before performing major system changes.

```bash
wsl --export <Distro> "$env:USERPROFILE\Desktop\distro_backup.tar"  

```

---

## Uninstallation and Cleanup

### Unregistering a Distribution

If you no longer require a specific environment, you can unregister it.

> **Note:** This action is irreversible and will permanently delete all files and data associated with that distribution.

```bash
wsl --unregister <Distro>

```