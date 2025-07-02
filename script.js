const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new SpeechRecognize();
const btn = document.querySelector('.control');

function recordVoice() {
  const isRecord = btn.classList.contains('record');

  if (isRecord) {
    recognize.start();
    btn.classList.remove('record');
    btn.classList.add('pause');
    btn.innerText = "Pause";
  } else {
    recognize.stop();
    btn.classList.remove('pause');
    btn.classList.add('record');
    btn.innerText = "Record";
  }
}

function setVoicetoText(e) {
  let transcript = e.results[0][0].transcript;
  let message = document.querySelector('.message');
  // แสดงข้อความที่ถูกจับได้
  message.innerText += `Detected: ${transcript}\n`;

  // เรียกฟังก์ชันแปลภาษา
  translateText(transcript);
}

async function translateText(text) {
  try {
    // ใช้ API ของ MyMemory สำหรับแปลภาษา (API ฟรี)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|th`);
    const data = await response.json();
    const translated = data.responseData.translatedText;
    let message = document.querySelector('.message');
    // แสดงผลลัพธ์คำแปล
    message.innerText += `แปลเป็นไทย: ${translated}\n\n`;
  } catch (err) {
    console.error(err);
  }
}

function continueRecord() {
  const isPause = btn.classList.contains('pause');
  if (isPause) {
    recognize.start();
  }
}

function setUpVoice() {
  // ตั้งค่าให้จดจำเสียงภาษาอังกฤษ
  recognize.lang = "en-US";
  btn.addEventListener('click', recordVoice);
  recognize.addEventListener('result', setVoicetoText);
  recognize.addEventListener('end', continueRecord);
}

setUpVoice();
