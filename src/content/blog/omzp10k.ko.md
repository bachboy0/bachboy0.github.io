---
title: "Oh My Zsh + Powerlevel10k 설정 가이드"
description: "터미널을 Oh My Zsh + Powerlevel10k 설정으로 보기 편하게 하는 가이드"
pubDate: "2026-03-03"
heroImage: "../../assets/p10kterminal.jpg"
lang: "ko"
---

## 개요: Oh My Zsh + Powerlevel10k 설정 가이드

작업 상태를 한눈에 보기 쉽게 하기 위해 **Zsh**, **Oh My Zsh**, 그리고 **Powerlevel10k** 테마를 사용하여 터미널을 고성능 환경으로 전환하는 과정을 기록했습니다.

---

### 1. Zsh 설치

Zsh 쉘을 설치합니다. Zsh는 Bash와 높은 호환성을 유지하면서도 뛰어난 자동 완성 및 플러그인 관리 기능이 있습니다. 이 자동 완성 기능 하나가 커맨드 하나당 최소 3초 이상의 시간을 단축시키기 때문에, 요긴하게 쓰고 있습니다.

```bash
sudo apt update && sudo apt install zsh -y

```

### 2. 기본 쉘을 Zsh로 변경

시스템의 기본 쉘을 Bash에서 Zsh로 변경하여 터미널 시작 시 자동으로 실행되도록 설정합니다.

```bash
chsh -s $(which zsh)

```

### 3. Zsh 환경 초기화

현재 쉘 프로세스를 새로운 Zsh 인스턴스로 교체하여 변경 사항을 즉시 적용합니다.

```bash
exec zsh

```

### 4. Oh My Zsh 설치

플러그인 및 테마 설정을 간소화해주는 Oh My Zsh 프레임워크를 설치합니다.

```bash
sh -c "$(curl -fsSL [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

```

### 5. 필수 폰트 설치

Powerlevel10k는 특정 글리프(아이콘)를 표시하기 위해 Nerd Fonts가 필요합니다. 아이콘 깨짐 현상을 방지하려면 **호스트 PC에 다음 폰트를 설치**하고 터미널의 기본 폰트로 설정하십시오. 폰트를 설치/터미널 폰트 설정을 하지 않으면 다음 과정에서 글자 깨짐 현상이 일어납니다.

- [MesloLGS NF Regular](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)

### 6. Powerlevel10k 저장소 복제

Oh My Zsh의 커스텀 테마 디렉토리에 테마 파일을 다운로드합니다.

```bash
git clone --depth=1 [https://github.com/romkatv/powerlevel10k.git](https://github.com/romkatv/powerlevel10k.git) "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"

```

### 7. `.zshrc` 설정

구성 파일을 열고 `ZSH_THEME` 변수를 업데이트합니다.

```bash
# 파일 열기
vi ~/.zshrc

# 다음 라인을 찾아 수정하십시오:
ZSH_THEME="powerlevel10k/powerlevel10k"

```

### 8. 변경 사항 적용

세션을 종료하지 않고 새로운 테마 설정을 불러오기 위해 `.zshrc` 파일을 소싱(source)합니다.

```bash
source ~/.zshrc

```

### 9. 설정 마법사 실행

쉘을 재시작하여 Powerlevel10k 설정 프로세스를 트리거합니다.

```bash
exec zsh

```

### 10. 최종 맞춤 설정

설정 마법사의 안내에 따라 선호하는 스타일(Rainbow, Lean, Classic 등)을 선택합니다. 화면의 지시에 따라 프롬프트 디자인을 최종 확정하십시오.
