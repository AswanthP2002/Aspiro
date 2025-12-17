import { Request } from "express";
import ISessionService from "../../application/interfaces/services/ISessionService";

export default class SessionService implements ISessionService {
  session : any
  constructor(request : Request) {
    this.session = request.session
  }
  set(key: string, value: string): void {
    this.session[key] = value
  }

  get<T>(key: T): T {
    return this.session[key]
  }

  remove(key: string): void {
    delete this.session[key]
  }
}