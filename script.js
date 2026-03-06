document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const inputs = {
        name: document.getElementById('input-name'),
        handle: document.getElementById('input-handle'),
        log: document.getElementById('input-log'),
        upload: document.getElementById('image-upload')
    };

    const outputs = {
        name: document.querySelectorAll('.out-name'),
        handle: document.querySelectorAll('.out-handle'),
        log: document.querySelectorAll('.out-log'),
        date: document.querySelectorAll('.out-date'),
        images: document.querySelectorAll('.profile-img-target')
    };

    const dropZone = document.getElementById('drop-zone');
    const matButtons = document.querySelectorAll('.mat-btn');
    const tplButtons = document.querySelectorAll('.tpl-btn');
    const tplViews = document.querySelectorAll('.tpl-content');
    const previewWrapper = document.getElementById('preview-wrapper');
    const cardNode = document.getElementById('card-export-node');
    
    // Buttons
    const btnDownload = document.getElementById('btn-download');
    const btnCopy = document.getElementById('btn-copy');
    const btnDemo = document.getElementById('btn-demo');

    // --- State Management ---
    let state = {
        name: '',
        handle: '',
        log: '',
        image: null,
        tpl: '1',
        mat: 'obsidian'
    };

    // Initialize Date
    const setTodayDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = String(today.getFullYear()).slice(2);
        const dateStr = `${dd}.${mm}.${yy}`;
        outputs.date.forEach(el => el.textContent = dateStr);
        return dateStr;
    };
    const currentDateStr = setTodayDate();

    // Responsive Preview Scaling
    const resizePreview = () => {
        // Parent container width minus some padding
        const containerWidth = previewWrapper.parentElement.clientWidth - 40; 
        // Card is fixed at 800px width
        const scale = Math.min(1, containerWidth / 800);
        cardNode.style.transform = `scale(${scale})`;
        // Adjust wrapper height to prevent excessive empty space
        previewWrapper.style.height = `${500 * scale}px`;
    };
    window.addEventListener('resize', resizePreview);

    // --- Core Logic ---

    const updateDOM = () => {
        // Text Updates
        outputs.name.forEach(el => el.textContent = state.name || 'Your Name');
        outputs.handle.forEach(el => el.textContent = state.handle || 'handle');
        outputs.log.forEach(el => el.textContent = state.log || 'Write your devlog updates here...\n\n- Fixed bugs\n- Shipped features\n- Drank coffee');

        // Image Update
        if (state.image) {
            outputs.images.forEach(el => el.style.backgroundImage = `url(${state.image})`);
        }

        // Material Switcher
        matButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mat === state.mat);
        });
        
        // Remove all theme classes and add the active one
        cardNode.classList.remove('theme-obsidian', 'theme-silver', 'theme-gold');
        cardNode.classList.add(`theme-${state.mat}`);

        // Template Switcher
        tplButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tpl === state.tpl);
        });
        tplViews.forEach((view, index) => {
            const tplId = (index + 1).toString();
            if (tplId === state.tpl) {
                view.classList.remove('hidden');
                view.classList.add('flex');
            } else {
                view.classList.add('hidden');
                view.classList.remove('flex');
            }
        });
    };

    const saveState = () => {
        try {
            // Avoid saving massive base64 images to localstorage to prevent Quota issues
            const stateToSave = { ...state, image: null }; 
            localStorage.setItem('devlogState', JSON.stringify(stateToSave));
        } catch (e) {
            console.warn('Could not save to localStorage', e);
        }
    };

    const loadState = () => {
        try {
            const saved = localStorage.getItem('devlogState');
            if (saved) {
                state = { ...state, ...JSON.parse(saved) };
                inputs.name.value = state.name;
                inputs.handle.value = state.handle;
                inputs.log.value = state.log;
            }
        } catch (e) {
            console.warn('Could not load from localStorage');
        }
    };

    const handleInput = (e) => {
        state[e.target.id.split('-')[1]] = e.target.value;
        updateDOM();
        saveState();
    };

    // --- Image Handling ---

    const processFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            state.image = e.target.result;
            updateDOM();
        };
        reader.readAsDataURL(file);
    };

    inputs.upload.addEventListener('change', (e) => processFile(e.target.files[0]));
    
    // Drag and Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-gold-500', 'bg-gray-900');
    });
    ['dragleave', 'dragend'].forEach(type => {
        dropZone.addEventListener(type, () => {
            dropZone.classList.remove('border-gold-500', 'bg-gray-900');
        });
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-gold-500', 'bg-gray-900');
        if (e.dataTransfer.files.length) {
            processFile(e.dataTransfer.files[0]);
        }
    });

    // --- Event Listeners ---

    inputs.name.addEventListener('input', handleInput);
    inputs.handle.addEventListener('input', handleInput);
    inputs.log.addEventListener('input', handleInput);

    matButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            state.mat = btn.dataset.mat;
            updateDOM();
            saveState();
        });
    });

    tplButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            state.tpl = btn.dataset.tpl;
            updateDOM();
            saveState();
        });
    });

    btnDemo.addEventListener('click', () => {
        state.name = "Alex Developer";
        state.handle = "alexdevs";
        state.log = "🚀 Shipped v2.0 to production\n✨ Built the new metal card rendering engine using html-to-image\n🔥 Optimized Webpack bundle size by 45%\n\nTime for a well-deserved weekend.";
        
        inputs.name.value = state.name;
        inputs.handle.value = state.handle;
        inputs.log.value = state.log;
        
        // Add a placeholder gradient image for demo
        state.image = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23222"/><text x="50" y="55" font-family="sans-serif" font-size="40" fill="%23d4af37" text-anchor="middle">A</text></svg>';
        
        updateDOM();
        saveState();
    });

    // --- Export Logic (html-to-image) ---

    const generateImage = async (format = 'dataUrl') => {
        // Remove transform scaling temporarily for a crisp 1:1 capture
        const originalTransform = cardNode.style.transform;
        cardNode.style.transform = 'none';
        
        try {
            const options = {
                pixelRatio: 3, // 3x high-res
                backgroundColor: 'transparent'
            };

            // html-to-image has native methods for both PNG urls and Blobs
            if (format === 'blob') {
                return await htmlToImage.toBlob(cardNode, options);
            } else {
                return await htmlToImage.toPng(cardNode, options);
            }
        } finally {
            // Restore UI scale
            cardNode.style.transform = originalTransform;
        }
    };

    btnDownload.addEventListener('click', async () => {
        const originalText = btnDownload.innerHTML;
        btnDownload.innerHTML = 'Rendering...';
        btnDownload.disabled = true;

        try {
            const dataUrl = await generateImage('dataUrl');
            const a = document.createElement('a');
            const cleanHandle = (state.handle || 'dev').replace(/[^a-zA-Z0-9]/g, '');
            const safeDate = currentDateStr.replace(/\./g, '');
            
            a.download = `devlog-${cleanHandle}-${safeDate}.png`;
            a.href = dataUrl;
            a.click();
        } catch (e) {
            console.error("Export failed:", e);
            alert("Failed to export image. Check console for details.");
        } finally {
            btnDownload.innerHTML = originalText;
            btnDownload.disabled = false;
        }
    });

    btnCopy.addEventListener('click', async () => {
        if (!navigator.clipboard || !navigator.clipboard.write) {
            alert('Your browser does not support copying images to the clipboard.');
            return;
        }

        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = 'Copying...';
        btnCopy.disabled = true;

        try {
            // FIX: Pass a Promise directly into ClipboardItem to prevent browser 
            // security timeouts from blocking the async clipboard write.
            const blobPromise = generateImage('blob').then(blob => {
                // Force strict PNG mime type just to be safe
                return new Blob([blob], { type: 'image/png' });
            });

            const item = new ClipboardItem({ 'image/png': blobPromise });
            await navigator.clipboard.write([item]);
            
            btnCopy.innerHTML = 'Copied!';
        } catch (e) {
            console.error("Copy failed:", e);
            alert('Failed to copy to clipboard. Your browser might be blocking it.');
        } finally {
            setTimeout(() => {
                btnCopy.innerHTML = originalText;
                btnCopy.disabled = false;
            }, 2000);
        }
    });
    // Keyboard Shortcut (Cmd/Ctrl + Enter)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            btnDownload.click();
        }
    });

    // --- Initialization ---
    loadState();
    updateDOM();
    // Run initial resize to fit current screen
    setTimeout(resizePreview, 50); 
});