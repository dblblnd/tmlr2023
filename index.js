(function ($) {

  const SAMPLES_ROOT = 'https://dblblnd.github.io/neurips23/samples';

  async function onDomReady() {
    const audioMidiPlayerTemplate = document.querySelector('#audio-midi-player-template');
    document.querySelectorAll('div.audio-midi-player').forEach((player, i) => {
      const midiSample = player.getAttribute('midi-sample');
      const mp3Sample = player.getAttribute('mp3-sample');

      // Grab elements
      const content = audioMidiPlayerTemplate.content.cloneNode(true);
      const midiVisualizer = content.querySelector('midi-visualizer');
      const midiPlayer = content.querySelector('midi-player');
      const audioPlayer = content.querySelector('audio');
      const audioSource = content.querySelector('source');
      console.log(midiPlayer);

      // Configure MIDI player
      midiVisualizer.setAttribute('id', `audio-midi-player-${i}`);
      midiPlayer.setAttribute('visualizer', `#audio-midi-player-${i}`);
      const midiSrc = `${SAMPLES_ROOT}/${midiSample}`;
      midiVisualizer.setAttribute('src', midiSrc);
      midiPlayer.setAttribute('src', midiSrc);

      // Configure audio player
      const audioSrc = `${SAMPLES_ROOT}/${mp3Sample}`;
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
        console.log('stop', midiPlayer.currentTime);
        audioPlayer.pause();
      });

      player.appendChild(content);
    });

    /*
    $("#inpainted-music a, #controll-number-of-bars a").click(function () {
      // switch to the selected model
      const songNumber = $(this).parent().parent().attr('id')
      const midiUrl = $(this).attr('midi-url')
      const midiPlayerId = songNumber + '-' + 'player'
      const midiVisualizerId = songNumber + '-' + 'visualizer'
      $('#' + midiPlayerId).attr("src", midiUrl);
      $('#' + midiVisualizerId).attr("src", midiUrl);

      // set the anchor tag selected
      $('#' + songNumber + ' a.selected').removeAttr('class')
      $(this).attr('class', 'selected')
    });
    */
  }

  document.addEventListener("DOMContentLoaded", onDomReady, false);
})(window.$);
