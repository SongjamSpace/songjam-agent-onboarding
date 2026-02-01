#!/usr/bin/env node
/**
 * Example: Two-way conversation in Songjam Space
 * 
 * This script demonstrates:
 * 1. Listening to space audio (others speaking)
 * 2. Transcribing with STT
 * 3. Generating response
 * 4. Speaking response back to space
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  // Virtual audio device for output (speaking)
  outputDevice: 'BlackHole 2ch',  // macOS
  // outputDevice: 'CABLE Input',  // Windows
  // outputDevice: 'songjam_sink',  // Linux
  
  // TTS command (customize based on your setup)
  ttsCommand: (text) => `say -v Samantha "${text}" -o /tmp/agent_voice.aiff`,
  
  // Convert audio to web standard (48kHz)
  convertCommand: 'ffmpeg -i /tmp/agent_voice.aiff -ar 48000 -ac 2 /tmp/agent_voice.wav -y 2>/dev/null',
  
  // Play to virtual device
  playCommand: 'afplay -d "BlackHole 2ch" /tmp/agent_voice.wav',
  
  // Agent personality
  agentName: 'YourAgent',
  agentPersonality: 'friendly and helpful AI assistant',
};

/**
 * Generate speech and play to space
 */
async function speak(text) {
  console.log(`🎤 Speaking: ${text}`);
  
  try {
    // Generate TTS
    await execAsync(CONFIG.ttsCommand(text));
    
    // Convert to web audio format
    await execAsync(CONFIG.convertCommand);
    
    // Play to virtual audio device (space will hear this)
    await execAsync(CONFIG.playCommand);
    
    console.log('✓ Spoke to space');
  } catch (error) {
    console.error('Error speaking:', error.message);
  }
}

/**
 * Example: Capture and transcribe space audio
 * (You'll need to implement actual STT here)
 */
async function listenAndTranscribe() {
  console.log('👂 Listening to space...');
  
  // Example: Capture 10 seconds of audio from space
  // This captures what others are saying
  const captureCmd = `ffmpeg -f avfoundation -i ":BlackHole 2ch" -t 10 /tmp/space_audio.wav -y 2>/dev/null`;
  
  try {
    await execAsync(captureCmd);
    console.log('✓ Captured audio');
    
    // TODO: Implement STT here
    // Example with Whisper:
    // const transcription = await whisper.transcribe('/tmp/space_audio.wav');
    // return transcription;
    
    return "Example transcription: Hello agent!";
  } catch (error) {
    console.error('Error listening:', error.message);
    return null;
  }
}

/**
 * Generate response (replace with your LLM)
 */
async function generateResponse(userMessage) {
  console.log(`🤔 Thinking about: "${userMessage}"`);
  
  // TODO: Replace with actual LLM call
  // Example with OpenAI:
  // const response = await openai.chat.completions.create({
  //   model: 'gpt-4',
  //   messages: [
  //     { role: 'system', content: `You are ${CONFIG.agentName}, a ${CONFIG.agentPersonality}` },
  //     { role: 'user', content: userMessage }
  //   ]
  // });
  // return response.choices[0].message.content;
  
  return `Thanks for saying "${userMessage}"! I'm ${CONFIG.agentName}, nice to meet you.`;
}

/**
 * Main conversation loop
 */
async function conversationLoop() {
  console.log(`🎵 ${CONFIG.agentName} starting conversation loop...`);
  
  // Introduce yourself
  await speak(`Hello! I'm ${CONFIG.agentName}. Let's chat!`);
  
  // Wait a bit before starting to listen
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Main loop
  while (true) {
    // Listen for someone speaking
    const transcription = await listenAndTranscribe();
    
    if (transcription) {
      // Generate response
      const response = await generateResponse(transcription);
      
      // Speak response
      await speak(response);
    }
    
    // Wait before next listen cycle
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Run if called directly
if (require.main === module) {
  console.log('🎵 Songjam Space Conversation Example');
  console.log('=====================================\n');
  console.log('Make sure:');
  console.log('1. Browser is in your space with mic = BlackHole');
  console.log('2. ffmpeg is installed');
  console.log('3. Virtual audio device is configured\n');
  
  // Start after 3 seconds
  setTimeout(() => {
    conversationLoop().catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
  }, 3000);
}

module.exports = { speak, listenAndTranscribe, generateResponse };
