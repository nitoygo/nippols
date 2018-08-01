
class AlarmService {

  constructor(callbackFunction, interval) {
    this.callbackFunction = callbackFunction;
    this.interval = interval;

    this.isStopped = true;
  }

  _executeOneCycle() {
    setTimeout(this._triggerAlarm.bind(this), this.interval);
  }

  _triggerAlarm() {
    this.callbackFunction();
    if (!this.isStopped) {
      this._executeOneCycle();
    }
  }

  start() {
    this.isStopped = false;
    this._executeOneCycle();
  }

  stop() {
    this.isStopped = true;
  }

}

export default AlarmService;
