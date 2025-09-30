// API Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const modeButtons = document.querySelectorAll('.mode-btn');
const storyForm = document.getElementById('story-form');
const educationForm = document.getElementById('education-form');
const storyGeneratorForm = document.getElementById('storyGeneratorForm');
const educationFormElement = document.getElementById('educationForm');
const resultsContainer = document.getElementById('results');
const resultsTitle = document.getElementById('resultsTitle');
const resultsContent = document.getElementById('resultsContent');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const copyBtn = document.getElementById('copyBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const newStoryBtn = document.getElementById('newStoryBtn');

// State Management
let currentMode = 'story';
let lastFormData = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    showForm('story');
});

// Event Listeners
function initializeEventListeners() {
    // Mode selector buttons
    modeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchMode(mode);
        });
    });

    // Form submissions
    storyGeneratorForm.addEventListener('submit', handleStorySubmission);
    educationFormElement.addEventListener('submit', handleEducationSubmission);

    // Action buttons
    copyBtn.addEventListener('click', copyToClipboard);
    regenerateBtn.addEventListener('click', regenerateContent);
    newStoryBtn.addEventListener('click', startNewStory);
}

// Mode Switching
function switchMode(mode) {
    currentMode = mode;
    
    // Update active button
    modeButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Show appropriate form
    showForm(mode);
    
    // Hide results
    hideResults();
}

function showForm(mode) {
    if (mode === 'story') {
        storyForm.classList.remove('hidden');
        educationForm.classList.add('hidden');
    } else {
        storyForm.classList.add('hidden');
        educationForm.classList.remove('hidden');
    }
}

// Form Handling
async function handleStorySubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(storyGeneratorForm);
    const data = {
        prompt: formData.get('prompt'),
        genre: formData.get('genre') || null,
        tone: formData.get('tone') || 'friendly',
        length: formData.get('length') || 'short',
        audience: formData.get('audience') || 'general',
        perspective: formData.get('perspective') || 'third-person'
    };
    
    lastFormData = { type: 'story', data };
    await generateContent('/generate_story', data, 'Generated Story');
}

async function handleEducationSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(educationFormElement);
    const data = {
        concept: formData.get('concept'),
        tone: formData.get('tone') || 'friendly',
        length: formData.get('length') || 'short',
        audience: formData.get('audience') || 'general',
        complexity: formData.get('complexity') || 'simple',
        perspective: formData.get('perspective') || 'third-person'
    };
    
    lastFormData = { type: 'education', data };
    await generateContent('/explain_concept', data, 'Educational Story');
}

// API Communication
async function generateContent(endpoint, data, title) {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.story) {
            showResults(result.story, title);
        } else {
            throw new Error('No story content received from server');
        }
        
    } catch (error) {
        console.error('Error generating content:', error);
        showError(`Failed to generate content: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// UI State Management
function showLoading() {
    loadingElement.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    errorElement.classList.add('hidden');
}

function hideLoading() {
    loadingElement.classList.add('hidden');
}

function showResults(content, title) {
    resultsTitle.textContent = title;
    resultsContent.textContent = content;
    resultsContainer.classList.remove('hidden');
    errorElement.classList.add('hidden');
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideResults() {
    resultsContainer.classList.add('hidden');
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    errorElement.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
}

function hideError() {
    errorElement.classList.add('hidden');
}

// Action Button Handlers
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(resultsContent.textContent);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#28a745';
        }, 2000);
        
    } catch (error) {
        console.error('Failed to copy text:', error);
        showError('Failed to copy to clipboard');
    }
}

async function regenerateContent() {
    if (!lastFormData) {
        showError('No previous content to regenerate');
        return;
    }
    
    if (lastFormData.type === 'story') {
        await generateContent('/generate_story', lastFormData.data, 'Generated Story');
    } else {
        await generateContent('/explain_concept', lastFormData.data, 'Educational Story');
    }
}

function startNewStory() {
    hideResults();
    hideError();
    
    // Reset forms
    storyGeneratorForm.reset();
    educationFormElement.reset();
    
    // Set default values
    document.getElementById('storyAudience').value = 'general';
    document.getElementById('eduAudience').value = 'general';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e1e5e9';
        }
    });
    
    return isValid;
}

// Add real-time validation
document.addEventListener('input', function(e) {
    if (e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '#28a745';
        } else {
            e.target.style.borderColor = '#e1e5e9';
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeForm = currentMode === 'story' ? storyGeneratorForm : educationFormElement;
        if (activeForm && !loadingElement.classList.contains('hidden')) {
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to start new story
    if (e.key === 'Escape') {
        startNewStory();
    }
});

// Auto-save form data to localStorage
function saveFormData() {
    const form = currentMode === 'story' ? storyGeneratorForm : educationFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem(`ai-story-${currentMode}`, JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem(`ai-story-${currentMode}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = currentMode === 'story' ? storyGeneratorForm : educationFormElement;
        
        Object.entries(data).forEach(([key, value]) => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = value;
            }
        });
    }
}

// Save form data on input
document.addEventListener('input', function(e) {
    if (e.target.closest('form')) {
        saveFormData();
    }
});

// Load saved data when switching modes
modeButtons.forEach(button => {
    button.addEventListener('click', function() {
        setTimeout(loadFormData, 100);
    });
});

// Initialize with saved data
setTimeout(loadFormData, 100);

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}

