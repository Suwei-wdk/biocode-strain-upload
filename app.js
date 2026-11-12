(() => {
  const key = 'biocode-strain-upload-v1';
  const fields = ['strainName', 'latinName', 'strainId', 'supplier', 'source', 'productCode', 'typeStrain', 'recommendedMedium', 'depositDate', 'originalId', 'otherCollectionIds', 'mainUse', 'specificUse', 'features', 'cultureTemp', 'oxygenType', 'preservationMethod', 'format', 'medium', 'quantity', 'storage', 'price', 'leadTime', 'useLimit', 'delivery', 'notes'];
  const form = document.getElementById('strain-form');
  const feedback = document.getElementById('form-feedback');

  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved) fields.forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field && saved[name]) field.value = saved[name];
    });
  } catch {
    feedback.textContent = '当前浏览器中的旧草稿无法读取，可以重新填写。';
  }

  function save() {
    const data = {};
    fields.forEach((name) => {
      data[name] = String(form.elements.namedItem(name)?.value || '').trim();
    });
    try {
      localStorage.setItem(key, JSON.stringify(data));
      feedback.textContent = '已保存到当前浏览器；附件不会保存或上传。';
    } catch {
      feedback.textContent = '浏览器未能保存草稿，请检查存储设置。';
    }
  }

  document.getElementById('save-draft').addEventListener('click', save);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    save();
  });
})();
