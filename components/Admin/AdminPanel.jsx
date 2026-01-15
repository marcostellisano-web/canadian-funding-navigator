import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, Settings } from 'lucide-react';

export default function AdminPanel({ programs, onRefresh }) {
  const [editingProgram, setEditingProgram] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'CMF',
    organization: '',
    description: '',
    eligibility: '',
    fundingRange: '',
    deadlines: '',
    website: '',
    tags: '',
    keyPoints: '',
    upcomingDeadlines: ''
  });

  const handleDeleteProgram = async (id) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await onRefresh();
        alert('Program deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setIsAddingNew(false);
    setFormData({
      name: program.name,
      category: program.category,
      organization: program.organization,
      description: program.description,
      eligibility: program.eligibility,
      fundingRange: program.fundingRange,
      deadlines: program.deadlines,
      website: program.website,
      tags: program.tags.join(', '),
      keyPoints: program.keyPoints.join('\n'),
      upcomingDeadlines: JSON.stringify(program.upcomingDeadlines, null, 2)
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProgram(null);
    setFormData({
      name: '',
      category: 'CMF',
      organization: '',
      description: '',
      eligibility: '',
      fundingRange: '',
      deadlines: '',
      website: '',
      tags: '',
      keyPoints: '',
      upcomingDeadlines: '[]'
    });
  };

  const handleCancelEdit = () => {
    setEditingProgram(null);
    setIsAddingNew(false);
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();

    try {
      // Validate and parse upcomingDeadlines JSON
      let upcomingDeadlines = [];
      if (formData.upcomingDeadlines && formData.upcomingDeadlines.trim()) {
        try {
          upcomingDeadlines = JSON.parse(formData.upcomingDeadlines);
          if (!Array.isArray(upcomingDeadlines)) {
            alert('Upcoming Deadlines must be an array. Example: [{"date": "2025-05-22", "description": "Spring Intake"}]');
            return;
          }
        } catch (jsonError) {
          alert('Invalid JSON format for Upcoming Deadlines.\n\nError: ' + jsonError.message + '\n\nPlease use the format shown in the example below the field.');
          return;
        }
      }

      const programData = {
        name: formData.name,
        category: formData.category,
        organization: formData.organization,
        description: formData.description,
        eligibility: formData.eligibility,
        fundingRange: formData.fundingRange,
        deadlines: formData.deadlines,
        website: formData.website,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        keyPoints: formData.keyPoints.split('\n').map(t => t.trim()).filter(t => t),
        upcomingDeadlines: upcomingDeadlines
      };

      let response;
      if (editingProgram) {
        response = await fetch(`/api/programs/${editingProgram.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(programData)
        });
      } else {
        response = await fetch('/api/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(programData)
        });
      }

      if (response.ok) {
        await onRefresh();
        handleCancelEdit();
        alert(editingProgram ? 'Program updated successfully' : 'Program created successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = errorData.error || `Failed to save program (Status: ${response.status})`;
        if (errorData.details) {
          errorMessage += `\nDetails: ${errorData.details}`;
        }
        if (errorData.code) {
          errorMessage += `\nError code: ${errorData.code}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program: ' + error.message);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Manage Programs</h2>
        {!isAddingNew && !editingProgram && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <Plus size={16} />
            Add New Program
          </button>
        )}
      </div>

      {(isAddingNew || editingProgram) ? (
        <form onSubmit={handleSaveProgram} className="space-y-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProgram ? 'Edit Program' : 'Add New Program'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            >
              <option value="CMF">CMF</option>
              <option value="Canadian Tax Credits">Canadian Tax Credits</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization *
            </label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligibility / Requirements
            </label>
            <textarea
              rows={2}
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Funding Range *
            </label>
            <input
              type="text"
              required
              value={formData.fundingRange}
              onChange={(e) => setFormData({ ...formData, fundingRange: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadlines *
            </label>
            <input
              type="text"
              required
              value={formData.deadlines}
              onChange={(e) => setFormData({ ...formData, deadlines: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              placeholder="e.g., May and September intake periods"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL *
            </label>
            <input
              type="url"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              placeholder="Documentary, English, Quebec"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Points (one per line)
            </label>
            <textarea
              rows={4}
              value={formData.keyPoints}
              onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
              placeholder="Enter each key point on a new line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upcoming Deadlines (JSON format)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Format: Array of objects with "date" (YYYY-MM-DD) and "description" fields
            </p>
            <textarea
              rows={6}
              value={formData.upcomingDeadlines}
              onChange={(e) => setFormData({ ...formData, upcomingDeadlines: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 font-mono text-sm"
              placeholder={`Example:
[
  { "date": "2025-05-22", "description": "Spring Intake Period" },
  { "date": "2025-09-15", "description": "Fall Intake Period" }
]

For no deadlines, use: []`}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Save size={16} />
              {editingProgram ? 'Update Program' : 'Create Program'}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {programs.map(program => (
            <div
              key={program.id}
              className="p-5 border border-gray-200 rounded-lg hover:border-gray-300 transition-all bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{program.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {program.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{program.organization}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditProgram(program)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Edit program"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteProgram(program.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete program"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {programs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Settings size={48} className="mx-auto mb-4 opacity-30" />
              <p>No programs yet</p>
              <p className="text-sm mt-2">Click "Add New Program" to get started</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
