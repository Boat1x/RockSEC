import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // User-related models
  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      userType: a.enum(["admin", "consultant", "client"]),
      isActive: a.boolean().required(),
      lastLogin: a.datetime(),
      profileImage: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Consultant model
  Consultant: a
    .model({
      userId: a.string().required(),
      specialization: a.string(),
      certifications: a.string().array(),
      bio: a.string(),
      experience: a.integer(),
      university: a.string(),
      major: a.string(),
      status: a.enum(["pending", "approved", "rejected"]),
      submissionDate: a.datetime().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Client model
  Client: a
    .model({
      name: a.string().required(),
      contactPerson: a.string().required(),
      email: a.string().required(),
      phone: a.string(),
      address: a.string(),
      industry: a.string(),
      size: a.enum(["small", "medium", "large", "enterprise"]),
      status: a.enum(["active", "inactive", "pending"]),
      registrationDate: a.datetime().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Security Dashboard Models
  SecurityMetric: a
    .model({
      clientId: a.string().required(),
      metricName: a.string().required(),
      metricValue: a.float().required(),
      previousValue: a.float(),
      changePercentage: a.float(),
      lastUpdated: a.datetime().required(),
      category: a.enum([
        "threat",
        "system",
        "scan",
        "score",
        "defense",
        "compliance"
      ]),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Threat Model
  Threat: a
    .model({
      clientId: a.string().required(),
      threatType: a.string().required(),
      severity: a.enum(["low", "medium", "high", "critical"]),
      status: a.enum(["active", "mitigated", "false_positive"]),
      detectedDate: a.datetime().required(),
      lastUpdated: a.datetime(),
      affectedSystems: a.string().array(),
      description: a.string(),
      remediationSteps: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // System Model (for protected systems)
  System: a
    .model({
      clientId: a.string().required(),
      name: a.string().required(),
      systemType: a.string().required(),
      ipAddress: a.string(),
      macAddress: a.string(),
      operatingSystem: a.string(),
      lastScanDate: a.datetime(),
      securityScore: a.float(),
      vulnerabilities: a.integer(),
      status: a.enum(["protected", "at_risk", "compromised", "inactive"]),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Scan Model
  SecurityScan: a
    .model({
      clientId: a.string().required(),
      scanType: a.string().required(),
      startTime: a.datetime().required(),
      endTime: a.datetime(),
      status: a.enum(["scheduled", "in_progress", "completed", "failed"]),
      findings: a.integer(),
      systemsCovered: a.integer(),
      initiatedBy: a.string(),
      reportId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Historical Metrics for charts
  MetricHistory: a
    .model({
      clientId: a.string().required(),
      metricName: a.string().required(),
      timestamp: a.datetime().required(),
      value: a.float().required(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Assessment Report model
  AssessmentReport: a
    .model({
      title: a.string().required(),
      clientId: a.string().required(),
      consultantId: a.string().required(),
      status: a.enum(["draft", "submitted", "approved", "rejected"]),
      submissionDate: a.datetime(),
      approvalDate: a.datetime(),
      securityScore: a.integer(),
      findings: a.string().array(),
      recommendations: a.string().array(),
      reportContent: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Approval Request model
  ApprovalRequest: a
    .model({
      type: a.enum(["consultant", "report", "client"]),
      requesterId: a.string().required(),
      status: a.enum(["pending", "approved", "rejected"]),
      requestDetails: a.string().required(),
      submissionDate: a.datetime().required(),
      reviewerId: a.string(),
      reviewDate: a.datetime(),
      comments: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Activity Log model
  ActivityLog: a
    .model({
      userId: a.string().required(),
      action: a.string().required(),
      timestamp: a.datetime().required(),
      details: a.string(),
      ipAddress: a.string(),
      userAgent: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Security Settings model
  SecuritySetting: a
    .model({
      settingName: a.string().required(),
      settingValue: a.string().required(),
      description: a.string(),
      lastUpdated: a.datetime().required(),
      updatedBy: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Program Settings model
  ProgramSetting: a
    .model({
      settingName: a.string().required(),
      settingValue: a.string().required(),
      description: a.string(),
      category: a.string().required(),
      lastUpdated: a.datetime().required(),
      updatedBy: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // Maintain original Todo model
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
      priority: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>