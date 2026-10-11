// Arranque de la app. Todo lo genérico (inicio, aprende, 4 juegos, pasaporte) lo pone el kit;
// aquí sólo van las pantallas propias (opcionales). Ejemplo: el termómetro mágico.
Kit.start({
  data: window.APP_DATA,
  scenes: window.APP_SCENES,
  extras: [{ emoji: '🌡️', title: 'El termómetro mágico', sub: 'Calienta y enfría el agua', screen: 'termometro' }],
  screens: {
    termometro(v, params, K) {
      const STATES = [
        { max: 0, topic: 'solido', emoji: '🧊', color: '#7dd3fc', text: 'Hace mucho frío: el agua se congela y se vuelve hielo.' },
        { max: 99, topic: 'liquido', emoji: '💧', color: '#3b82f6', text: 'El agua está líquida: puedes tomarla y toma la forma del vaso.' },
        { max: 999, topic: 'gaseoso', emoji: '♨️', color: '#c084fc', text: '¡Llegó a 100 °C! El agua hierve y se convierte en vapor.' },
      ];
      v.innerHTML = `${K.topbar('🌡️ El termómetro mágico')}
        <div class="termo"><div class="termo-stage"><span class="termo-emoji"></span></div>
          <div class="termo-panel"><div class="termo-temp"></div><div class="termo-state"></div><p class="termo-text"></p>
            <input type="range" min="-20" max="120" value="20" aria-label="Temperatura"><div class="termo-scale"><span>❄️ -20 °C</span><span>0 °C</span><span>100 °C</span><span>🔥 120 °C</span></div></div></div>`;
      const range = v.querySelector('input'), emoji = v.querySelector('.termo-emoji');
      let last = null;
      const update = () => {
        const t = +range.value, st = STATES.find((s) => t <= s.max);
        v.style.setProperty('--tc', st.color);
        v.querySelector('.termo-temp').textContent = `${t} °C`;
        v.querySelector('.termo-state').textContent = `${K.TOPICS[st.topic].emoji} ${K.TOPICS[st.topic].name}`;
        v.querySelector('.termo-text').textContent = st.text;
        if (st !== last) {
          emoji.textContent = st.emoji; emoji.classList.remove('pop'); void emoji.offsetWidth; emoji.classList.add('pop');
          if (last) { K.SFX.ding(); K.burst(emoji, 20); }
          last = st;
        }
      };
      range.addEventListener('input', update);
      update();
      K.say(K.T.v('termo'));
    },
  },
});
