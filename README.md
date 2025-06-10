# 🧾 Orders & Invoices Microservices

> **🇧🇷** Microsserviços de pedidos e faturas com comunicação assíncrona, replicação de dados e observabilidade distribuída.  
> **🇺🇸** Order and invoice microservices with asynchronous communication, data replication, and distributed observability.

---

## 📦 Descrição | Description

### 🇧🇷 | Português

Este projeto consiste na construção de dois microsserviços independentes: um para **pedidos (Orders)** e outro para **faturas (Invoices)**. Os serviços se comunicam de forma **assíncrona** utilizando **RabbitMQ** como broker de mensagens.

A arquitetura foi pensada para escalar, manter a **consistência eventual** dos dados e permitir **observabilidade completa** via **Grafana**, com **tracing distribuído** e **logging estruturado**. O deploy é feito com **AWS Fargate**, utilizando **infraestrutura como código com Pulumi**.

**Tecnologias e conceitos aplicados:**
- RabbitMQ para mensageria assíncrona
- PostgreSQL com modelagem específica por serviço
- Consistência eventual entre domínios
- Replicação seletiva de dados
- Observabilidade com Grafana e OpenTelemetry
- API Gateway com Kong
- Deploy automatizado com Pulumi + AWS Fargate

---

### 🇺🇸 | English

This project builds two independent microservices: one for **Orders** and another for **Invoices**. Services communicate **asynchronously** using **RabbitMQ** as the message broker.

The architecture supports scalability, **eventual consistency**, and full **observability** using **Grafana**, with **distributed tracing** and **structured logging**. Deployment is handled through **AWS Fargate**, powered by **Pulumi** as infrastructure as code.

**Technologies and concepts applied:**
- Asynchronous messaging with RabbitMQ  
- PostgreSQL schema per service  
- Eventual consistency across domains  
- Selective data replication  
- Observability with Grafana, Loki, and OpenTelemetry  
- API Gateway with Kong
- Automated deployment with Pulumi + AWS Fargate

---

## 🚀 Executando o Projeto | Running the Project

> Pré-requisitos / Prerequisites:  
> - Docker + Docker Compose  
> - Pulumi CLI  
> - Conta AWS configurada via CLI  
> - Node.js (para scripts)

```bash
# 🇧🇷 Suba os serviços localmente:
# 🇺🇸 Start services locally:
docker-compose up --build

# 🇧🇷 Realize o deploy na AWS:
# 🇺🇸 Deploy to AWS:
pulumi up
```

## 📊 Observabilidade | Observability
Tracing distribuído com OpenTelemetry

Logging estruturado integrado ao Grafana Loki

Dashboards configuráveis no Grafana

## 🛠 Estrutura do Projeto | Project Structure

```bash
/
├── .github/
│   ├── workflows/  
├── app-invoices/ # Microsserviço de faturas | Invoices microservice
├── app-orders/   # Microsserviço de pedidos | Orders microservice  
├── contracts/
│   ├── messages/  
├── docker/
│   ├── kong/
├── infra/        # IaC com Pulumi
├── docker-compose.yml
└── README.md
```

## 📄 Licença | License
Este projeto está licenciado sob a **MIT License**.

## 🤝 Contribuições são bem-vindas! | Contributions are welcome!
Se quiser melhorar algo, abrir uma issue ou enviar um pull request, fique à vontade!