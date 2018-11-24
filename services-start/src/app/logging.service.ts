export class LoggingService {
  logStatusChain(status: string) {
    console.log('A server status changes, new status: ' + status);
  }
}
