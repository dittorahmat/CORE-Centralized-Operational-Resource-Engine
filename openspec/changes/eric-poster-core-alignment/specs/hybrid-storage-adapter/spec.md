## Purpose

Provides a clean storage abstraction supporting Cloudflare R2 bucket storage for cloud demo deployments and local file disk storage for on-premise enterprise environments.

## ADDED Requirements

### Requirement: Storage Adapter Pattern
The system SHALL implement an `IStorageProvider` interface with concrete implementations `R2StorageProvider` (Cloudflare R2) and `LocalStorageProvider` (Local Server Storage).

#### Scenario: File upload in On-Premise mode
- **WHEN** `DEPLOYMENT_MODE` environment variable is set to `on-premise`
- **THEN** uploaded files are saved to the local server `/uploads` directory and accessible via local server URL.

#### Scenario: File upload in Cloudflare mode
- **WHEN** `DEPLOYMENT_MODE` environment variable is set to `cloudflare`
- **THEN** uploaded files are saved to Cloudflare R2 bucket and accessible via public/presigned R2 bucket URL.
