(function () {

  const SAMPLES_ROOT = 'https://dblblnd.github.io/neurips23/samples';

  async function onDomReady() {
    // Initialize synchronized MIDI / audio playback visualizer
    const audioMidiPlayerTemplate = document.querySelector('#audio-midi-player-template');
    document.querySelectorAll('div.audio-midi-player').forEach((player, i) => {
      const exampleTag = player.getAttribute('example');

      // Grab elements
      const content = audioMidiPlayerTemplate.content.cloneNode(true);
      const midiVisualizer = content.querySelector('midi-visualizer');
      const midiPlayer = content.querySelector('midi-player');
      const audioPlayer = content.querySelector('audio');
      const audioSource = content.querySelector('source');

      // Configure MIDI player
      midiVisualizer.setAttribute('id', `audio-midi-player-${i}`);
      midiPlayer.setAttribute('visualizer', `#audio-midi-player-${i}`);
      const midiSrc = `${SAMPLES_ROOT}/${exampleTag}.vis.mid`;
      midiVisualizer.setAttribute('src', midiSrc);
      midiPlayer.setAttribute('src', midiSrc);

      // Configure audio player
      const audioSrc = `${SAMPLES_ROOT}/${exampleTag}.mp3`;
      audioSource.setAttribute('src', audioSrc);

      // Bind audio controls to MIDI player controls
      midiPlayer.addEventListener('load', function () {
        const midiPlayerSeekBar = midiPlayer.shadowRoot.querySelector('.seek-bar');
        midiPlayerSeekBar.addEventListener('input', function () {
          audioPlayer.pause();
        });
        midiPlayerSeekBar.addEventListener('change', function () {
          audioPlayer.currentTime = midiPlayer.currentTime;
          if (midiPlayer.playing)
            audioPlayer.play();
        });
      })
      midiPlayer.addEventListener('start', function () {
        audioPlayer.currentTime = midiPlayer.currentTime;
        audioPlayer.play();
      });
      midiPlayer.addEventListener('stop', function () {
        audioPlayer.pause();
      });

      player.appendChild(content);
    });

    // Initialize tab switchers
    document.querySelectorAll('div.example-tabbed').forEach((div, i) => {
      const midiVisualizer = div.querySelector('midi-visualizer');
      const midiPlayer = div.querySelector('midi-player');
      const audioPlayer = div.querySelector('audio');
      const audioSource = div.querySelector('source');
      div.querySelectorAll('a').forEach((a, j) => {
        const exampleTag = a.getAttribute('example');
        a.onclick = function () {
          div.querySelectorAll('a').forEach((_a) => { _a.className = ''; });
          a.className = 'selected';
          const midiSrc = `${SAMPLES_ROOT}/${exampleTag}.vis.mid`;
          const audioSrc = `${SAMPLES_ROOT}/${exampleTag}.mp3`;
          midiVisualizer.setAttribute('src', midiSrc);
          midiPlayer.setAttribute('src', midiSrc);
          audioPlayer.pause();
          audioSource.setAttribute('src', audioSrc);
          audioPlayer.load();
        };
      });
    });
  }

  document.addEventListener("DOMContentLoaded", onDomReady, false);
})();
