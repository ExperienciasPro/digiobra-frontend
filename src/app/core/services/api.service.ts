// ──────────────────────────────────────────────
//  ApiService  ·  Centralised HTTP gateway
// ──────────────────────────────────────────────
import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { environment }        from '../../../environments/environment';

// ── Interfaces ──────────────────────────────

export interface StatusResponse {
  status:    string;
  message:   string;
  uptime:    string;
  timestamp: string;
}

export interface Project {
  _id?:         string;
  nombre:       string;
  descripcion?: string;
  ubicacion?:   string;
  estado?:      'planificación' | 'en curso' | 'pausado' | 'finalizado';
  fechaInicio?: string | null;
  fechaFin?:    string | null;
  createdAt?:   string;
  updatedAt?:   string;
}

// ── Service ─────────────────────────────────

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // ── Health check ────────────────────────────
  getStatus(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(`${this.base}/api/status`);
  }

  // ── Projects CRUD ───────────────────────────

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/api/projects`);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.base}/api/projects/${id}`);
  }

  createProject(data: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.base}/api/projects`, data);
  }

  updateProject(id: string, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.base}/api/projects/${id}`, data);
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/api/projects/${id}`);
  }

  // ── Generic helpers (for future endpoints) ──

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}`);
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.base}/${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${path}`);
  }
}
