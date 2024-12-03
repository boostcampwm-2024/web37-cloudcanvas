<p align="middle" >
<img width="" alt="cicd" src="https://github.com/user-attachments/assets/a01828bf-7603-4262-9761-6a44b361c2bd">
</p>

<h2 align="center">🎨 Cloud Canvas 🎨</h2>
<p align="middle">쉽고 빠르게, 누구나 클라우드를 설계하는 즐거운 경험을!(배너로 대체 예정)</p>

## Cloud Canvas ✨

Cloud Canvas는 클라우드 인프라를 **그래픽 인터페이스**로 손쉽게 설계하고, 이를 **Terraform 코드**로 자동 변환할 수 있는 혁신적인 도구입니다. 국내 클라우드 플랫폼을 지원하며, 사용자가 **직관적으로** 인프라를 설계하고 **빠르게 배포**할 수 있도록 돕습니다.

## 🌟 **주요 기능**

-   **🎨 직관적인 UI/UX**  
    클릭 몇 번으로 누구나 쉽게 클라우드 인프라 설계!

-   **💻 Terraform 코드 변환**  
    설계한 인프라를 자동으로 Terraform 코드로 변환하여 다운로드 가능!

-   **🤝 협업 및 재활용**  
    **인프라 허브**를 통해 다른 사용자들과 설계도를 공유하고 수정하며 효율적으로 협업!

## 기능 시연

### GUI를 통한 인프라 설계

시나리오

1. 허브 페이지에서 헤더에 있는 새 캔버스 버튼을 눌러 캔버스 페이지로 이동한다.
2. 간단한 인프라를 설계한다.

### 테라폼 코드 변환

시나리오

1. 캔버스 페이지에 완성된 인프라 아키텍처가 존재한다.
2. 캔버스 페이지 우상단에 있는 convertor 버튼을 누르면 현재 설계된 인프라를 바탕으로 변환된 테라폼 코드가 나온다.
3. 테라폼 코드를 통해 배포된 인프라를 확인한다.

### 인프라 아키텍처 허브 업로드(프라이빗)

시나리오

1. 인프라 아키텍처를 완성했다고 가정하고 캔버스 페이지에서 저장 버튼을 누른다.(/canvas)
2. 저장이 완료되면, 새로고침 되며 발급받은 프라이빗 아키텍처를 parameter 붙여 private architecture 캔버스 페이지로 이동한다.(/canvas/private-architecutes/{id})
3. 해당 아키텍처가 캔버스에 다시 불러와진 것을 확인하면 허브 페이지로 이동한다.(/로 이동)
4. 허브 페이지에서 마이페이지로 이동하고 프라이빗 아키텍처 목록에서 새로운 목록이 추가된 것을 확인하고 클릭한다.
5. 새로 추가된 프라이빗 아키텍처 목록을 클릭하면 다시 캔버스 페이지로 이동한다.

### 인프라 아키텍처 허브 업로드(퍼블릭)

시나리오

1. 인프라 아키텍처를 완성했다고 가정하고 캔버스 페이지에서 저장 버튼을 누른다.(/canvas)
2. 저장이 완료되면, 새로고침 되며 발급받은 프라이빗 아키텍처를 parameter 붙여 private architecture 캔버스 페이지로 이동한다.(/canvas/private-architecutes/{id})
3. 해당 아키텍처가 캔버스에 다시 불러와진 것을 확인하면 허브 페이지로 이동한다.(/로 이동)
4. 허브 페이지에서 마이페이지로 이동하고 프라이빗 아키텍처 목록에서 새로운 목록이 추가된 것을 확인하고 클릭한다.
5. 새로 추가된 프라이빗 아키텍처 목록을 클릭하면 다시 캔버스 페이지로 이동한다.

### 인프라 아키텍처 허브 임포트

시나리오

1. 허브 페이지에서 아무 인프라 아키텍처 목록을 클릭한다.
2. 퍼블릭 인프라 아키텍처 상세 페이지로 이동하고 임포트 버튼을 클릭한다.
3. 임포트가 완료되면 캔버스 페이지로 리다이렉트 하고 임포트 되어 해당 아키텍처가 캔버스로 그려진 것을 확인한다.
4. 마이페이지로 들어가서, 임포트한 퍼블릭 인프라 아키텍처가 임포트 목록에 추가된 것을 확인한다.

<div align="center">

## 🚀 기술 스택

### 💻 Common

<p>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier"/>
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/>
    <img src="https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="PNPM"/>
    <img src="https://img.shields.io/badge/TSUP-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TSUP"/>
</p>

### 🖥️ Frontend

<p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
    <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query"/>
</p>

### 🔧 Backend

<p>
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"/>
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
    <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest"/>
</p>

### 🌐 Infrastructure

<p>
    <img src="https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo"/>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
    <img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose"/>
    <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions"/>
    <img src="https://img.shields.io/badge/Naver_Cloud-03C75A?style=for-the-badge&logo=naver&logoColor=white" alt="Naver Cloud"/>
    <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx"/>
</p>

### 🔍 DevOps & Monitoring

<p>
    <img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform"/>
    <img src="https://img.shields.io/badge/Terraform%20Cloud-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform Cloud"/>
    <img src="https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white" alt="Elasticsearch"/>
    <img src="https://img.shields.io/badge/FluentD-0E83C8?style=for-the-badge&logo=fluentd&logoColor=white" alt="FluentD"/>
    <img src="https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=kibana&logoColor=white" alt="Kibana"/>
    <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana"/>
    <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus"/>
</p>

### 💬 Communication Tools

<p>
    <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" alt="Slack"/>
    <img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white" alt="Zoom"/>
    <img src="https://img.shields.io/badge/Gather_Town-6E5494?style=for-the-badge&logo=googlemeet&logoColor=white" alt="Gather Town"/>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/>
</p>

</div>

---

## **아키텍처** 🌐

### **인프라 설계**

![image](https://github.com/user-attachments/assets/e8bd555e-ae84-4989-a520-800a61b3da54)

![image](https://github.com/user-attachments/assets/b18b1048-5fe8-43ee-a33f-8fbe2b38e873)

### **애플리케이션 설계**

![image](https://github.com/user-attachments/assets/04145d8b-61b0-401a-8943-7494a0f9aed5)

## 우리의 Next!

## 🌈 **함께하세요!**

> **Cloud Canvas로 클라우드 설계의 새로운 가능성을 경험해보세요!**  
> 프로젝트의 진행 상황과 더 많은 정보를 원하신다면 [GitHub Wiki](https://github.com/boostcampwm-2024/web37-cloud-canvas/wiki)에서 확인하세요. 😊

## **팀 소개** 👩‍💻

> 다양한 배경과 경험을 가진 네 명의 팀원이 Cloud Canvas를 만들고 있습니다.

|                         **김범준**                         |                        **고동민**                         |                        **최재영**                         |                        **서건혁**                         |
| :--------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: |
|                           **FE**                           |                          **BE**                           |                          **BE**                           |                          **BE**                           |
|             [p1n9](https://github.com/p1n9d3v)             |           [Gdm0714](https://github.com/Gdm0714)           |           [paulcjy](https://github.com/paulcjy)           |       [SeoGeonhyuk](https://github.com/SeoGeonhyuk)       |
| ![](https://avatars.githubusercontent.com/u/152015839?v=4) | ![](https://avatars.githubusercontent.com/u/50660440?v=4) | ![](https://avatars.githubusercontent.com/u/86853786?v=4) | ![](https://avatars.githubusercontent.com/u/60954160?v=4) |
|                            커피                            |                            빵                             |                           고기                            |                           국수                            |

---
