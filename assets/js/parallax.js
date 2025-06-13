function addText() {
      const text = document.getElementById('textInput').value;
      if (text.trim() === '') return;

      const container = document.getElementById('textContainer');
      const block = document.createElement('div');
      block.className = 'text-block';
      block.textContent = text;

      container.appendChild(block);
      document.getElementById('textInput').value = '';
    }