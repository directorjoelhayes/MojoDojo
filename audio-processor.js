class MyAudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.lastPressed = Date.now();
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    // Process each channel independently
    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      // Your processing logic here

      // Example: Calculate decibels for the channel
      const rms = Math.sqrt(inputChannel.reduce((acc, val) => acc + val * val, 0) / inputChannel.length);
      const decibels = 20 * Math.log10(rms);

      // Log the decibels value (you can replace this with your own action)
      if (decibels > -20) {
        if(Date.now() - this.lastPressed > 1000) {
          this.port.postMessage("pressed");
          this.lastPressed = Date.now()
        }
      }

      // Copy the input to the output
      // outputChannel.set(inputChannel);
    }

    // Send a message to the main script every 100 frames

    // Return true to keep the processor alive
    return true;
  }
}

// Register the processor
registerProcessor('your-processor', MyAudioProcessor);  