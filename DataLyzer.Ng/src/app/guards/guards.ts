import { AuthenticatedGuard } from "./authenticated.guard";

export function getGuards() {
  return [
    AuthenticatedGuard
  ];
}
