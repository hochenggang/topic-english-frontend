import Recorder from 'recorder-core';
import 'recorder-core/src/engine/mp3-engine.js';
import 'recorder-core/src/engine/mp3';

let recorder = null
const initRecorder = async (setValume) => {
  return new Promise((resolve, reject) => {
    recorder = new Recorder({
      type: 'mp3',
      sampleRate: 44100,
      bitRate: 16,
      onProcess: (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) => {
        // console.log(`正在录音，音量为 ${powerLevel}`);
        setValume(powerLevel);
        // 如果音量小于 3，开始计时
        if (powerLevel < 3) {
          if (!recorder.stopTimer) {
            recorder.stopTimer = setTimeout(() => {
              recorder.stop((blob, duration) => {
                recorder.close();
                recorder = null;
                console.log("录音成功", blob, "时长:" + duration + "ms");
                resolve(blob);
              });
            }, 1200); // 1.2 秒后停止录音
          }
        } else {
          // 如果音量大于 10，清除计时器
          if (recorder.stopTimer) {
            clearTimeout(recorder.stopTimer);
            recorder.stopTimer = null;
          }
        }
      }
    });

    recorder.open(() => {
      recorder.start();
    }, (msg, isUserNotAllow) => {
      // alert('抱歉，无法启动录音。\n' + msg);
      console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
      reject(msg);
    });
  });
};

export  {recorder,initRecorder};