// DOM Elements
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const outputPre = document.getElementById('output');
const outputCode = outputPre.querySelector('code');
const outputSection = document.querySelector('.output-section');
const statusEl = document.getElementById('status');

// State
let isGenerating = false;

// Generate function
async function generate() {
  const prompt = promptInput.value.trim();
  
  // Validation
  if (!prompt) {
    showStatus('Please describe your app first.', 'error');
    promptInput.focus();
    return;
  }

  if (isGenerating) return;
  
  // UI State: Loading
  setLoading(true);
  showStatus('');
  outputSection.hidden = true;

  try {
    const response = await puter.ai.chat(
      `Act as a senior React developer.
       Build a complete, well-structured React app based on the prompt below.
       
       Requirements:
       - Use functional components and hooks
       - Include clear, commented code
       - Output ONLY valid JSX/JavaScript code (no markdown, no explanations)
       
       Prompt: ${prompt}
       
       Output:`,
      {
        model: "claude-sonnet-4-6" // ⚠️ Verify this model name with Puter docs
      }
    );

    // Extract code from response (adjust based on actual Puter response structure)
    const code = extractCodeFromResponse(response);    
    // Display result
    outputCode.textContent = code;
    outputSection.hidden = false;
    showStatus('✅ Code generated successfully!', 'success');
    
    // Auto-scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    console.error('Generation error:', err);
    showStatus(`Error: ${err.message || 'Failed to generate code'}`, 'error');
  } finally {
    setLoading(false);
  }
}

// Helper: Extract code from AI response (customize based on Puter's actual response format)
function extractCodeFromResponse(response) {
  // Common patterns: response.message, response.content, response.text, or raw string
  if (typeof response === 'string') return response;
  if (response?.message?.content) return response.message.content;
  if (response?.content) return response.content;
  if (response?.text) return response.text;
  
  // Fallback: stringify and clean
  return JSON.stringify(response, null, 2)
    .replace(/^"|"$/g, '') // Remove surrounding quotes if present
    .replace(/\\n/g, '\n'); // Unescape newlines
}

// Helper: Show status message
function showStatus(message, type = 'info') {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
}

// Helper: Toggle loading state
function setLoading(loading) {
  isGenerating = loading;
  generateBtn.disabled = loading;
  generateBtn.setAttribute('aria-busy', loading);
  
  if (loading) {
    generateBtn.classList.add('loading');
    generateBtn.querySelector('.btn-text').hidden = true;
    generateBtn.querySelector('.btn-loader').hidden = false;
  } else {
    generateBtn.classList.remove('loading');
    generateBtn.querySelector('.btn-text').hidden = false;    generateBtn.querySelector('.btn-loader').hidden = true;
  }
}

// Copy to clipboard
async function copyCode() {
  const code = outputCode.textContent;
  if (!code) return;
  
  try {
    await navigator.clipboard.writeText(code);
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied! ✓';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  } catch (err) {
    showStatus('Failed to copy code', 'error');
  }
}

// Event Listeners
generateBtn.addEventListener('click', generate);
copyBtn.addEventListener('click', copyCode);

// Allow Ctrl+Enter to trigger generation
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    generate();
  }
});

// Auto-resize textarea
promptInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});
