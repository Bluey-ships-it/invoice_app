import {type Invoice } from "../types/invoice.types";

const invoices: Invoice[] = [
  {
    "id": "XM9141",
    "status": "pending",
    "billFrom": {
      "streetAddress": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "billTo": {
      "clientName": "Alex Grim",
      "clientEmail": "alexgrim@mail.com",
      "streetAddress": "84 Church Way",
      "city": "Bradford",
      "postCode": "BD1 9PB",
      "country": "United Kingdom"
    },
    "invoiceDate": "2021-08-21",
    "paymentDueDate": "2021-09-20",
    "paymentTerms": "Net 30 Days",
    "projectDescription": "Graphic Design",
    "itemList": [
      { "name": "Banner Design", "quantity": 1, "price": 156.00, "total": 156.00 },
      { "name": "Email Design", "quantity": 2, "price": 200.00, "total": 400.00 }
    ]
  },
  {
    "id": "RT3080",
    "status": "paid",
    "billFrom": {
      "streetAddress": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "billTo": {
      "clientName": "Jensen Huang",
      "clientEmail": "jensenh@mail.com",
      "streetAddress": "106 Kendell Street",
      "city": "Sharborough",
      "postCode": "NE1 0PX",
      "country": "United Kingdom"
    },
    "invoiceDate": "2021-08-18",
    "paymentDueDate": "2021-08-19",
    "paymentTerms": "Net 1 Day",
    "projectDescription": "Re-branding",
    "itemList": [
      { "name": "Brand Guidelines", "quantity": 1, "price": 1800.90, "total": 1800.90 }
    ]
  },
  {
    "id": "RG0314",
    "status": "paid",
    "billFrom": {
      "streetAddress": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "billTo": {
      "clientName": "John Morrison",
      "clientEmail": "john.morrison@myco.io",
      "streetAddress": "79 Dover Road",
      "city": "Westhall",
      "postCode": "IP19 3PF",
      "country": "United Kingdom"
    },
    "invoiceDate": "2021-09-24",
    "paymentDueDate": "2021-10-01",
    "paymentTerms": "Net 7 Days",
    "projectDescription": "Website Redesign",
    "itemList": [
      { "name": "Project Kickoff", "quantity": 1, "price": 2500.00, "total": 2500.00 },
      { "name": "Design Screens", "quantity": 5, "price": 1500.00, "total": 7500.00 },
      { "name": "Development", "quantity": 1, "price": 4002.33, "total": 4002.33 }
    ]
  },
  {
    "id": "RT2080",
    "status": "pending",
    "billFrom": {
      "streetAddress": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "billTo": {
      "clientName": "Alysa Werner",
      "clientEmail": "alysa.werner@mail.com",
      "streetAddress": "63 Warwick Road",
      "city": "Carlisle",
      "postCode": "CA20 2TG",
      "country": "United Kingdom"
    },
    "invoiceDate": "2021-09-28",
    "paymentDueDate": "2021-10-12",
    "paymentTerms": "Net 14 Days",
    "projectDescription": "Logo Design",
    "itemList": [
      { "name": "Logo Sketches", "quantity": 1, "price": 102.04, "total": 102.04 }
    ]
  },
  {
    "id": "AA1449",
    "status": "draft",
    "billFrom": {
      "streetAddress": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "billTo": {
      "clientName": "Sophia Anil",
      "clientEmail": "sophia.anil@myco.io",
      "streetAddress": "33 Sunset Drive",
      "city": "Ibiza",
      "postCode": "BX1 1LT",
      "country": "Spain"
    },
    "invoiceDate": "2021-09-05",
    "paymentDueDate": "2021-09-19",
    "paymentTerms": "Net 14 Days",
    "projectDescription": "UI/UX Design",
    "itemList": [
      { "name": "UI Design Screens", "quantity": 3, "price": 500.00, "total": 1500.00 },
      { "name": "Prototype", "quantity": 1, "price": 750.00, "total": 750.00 },
      { "name": "Usability Testing Report", "quantity": 1, "price": 300.00, "total": 300.00 }
    ]
  }
];

export default invoices;