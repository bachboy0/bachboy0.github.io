---
title: 'WSL 환경 설정'
description: 'WSL 환경 설정 가이드'
pubDate: '2026-02-09'
heroImage: '../../assets/blog-placeholder-4.jpg'
lang: 'ko'
---

# WSL 환경 설정 가이드

## PowerShell을 통한 초기 구성

### WSL 2를 기본 버전으로 설정

향후 모든 Linux 설치가 기본적으로 WSL 2 아키텍처를 사용하도록 다음 명령을 실행합니다.

```powershell
wsl --set-default-version 2

```

### 사용 가능한 배포판 나열

온라인 설치 가능한 Linux 배포판 목록을 보려면 아래 명령을 사용하세요.

```powershell
wsl --list --online

```

### 특정 배포판 설치

원하는 배포판을 설치하려면 `<Distro>`를 이전 단계에서 확인한 이름으로 바꾸세요.

```powershell
wsl.exe --install <Distro>

```

---

## 백업 및 내보내기

### 배포판 내보내기

`.tar` 아카이브로 환경의 전체 백업을 만들 수 있습니다. 주요 시스템 변경 전에 이 작업을 수행하는 것을 강력히 권장합니다.

```bash
wsl --export <Distro> "$env:USERPROFILE\Desktop\distro_backup.tar"  

```

---

## 제거 및 정리

### 배포판 등록 취소

특정 환경이 더 이상 필요하지 않으면 등록을 취소할 수 있습니다.

> **참고:** 이 작업은 되돌릴 수 없으며 해당 배포판과 관련된 모든 파일 및 데이터를 영구적으로 삭제합니다.

```bash
wsl --unregister <Distro>

```
