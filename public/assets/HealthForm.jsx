import React from 'react';

const HealthForm = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Form</h2>

      {/* Insurance Company and Physician Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name of Insurance Company: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="insuranceCompany"
            value={formData.insuranceCompany}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Name of Physician: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="physicianName"
            value={formData.physicianName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Physician Number and Disabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Physicians Number: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="physicianNumber"
            value={formData.physicianNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Does your child have any disabilities
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasDisabilities"
                value="Yes"
                checked={formData.hasDisabilities === 'Yes'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasDisabilities"
                value="No"
                checked={formData.hasDisabilities === 'No'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      {/* Disability Explanation */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          If yes please explain
        </label>
        <input
          type="text"
          name="disabilityExplanation"
          value={formData.disabilityExplanation}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={formData.hasDisabilities !== 'Yes'}
        />
      </div>

      {/* Medical Conditions Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Does your child have any of the following? (Please check those that apply){' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              { key: 'asthma', label: 'Asthma' },
              { key: 'diabetes', label: 'Diabetes' },
              { key: 'convulsion', label: 'Convulsion' },
              { key: 'heartTrouble', label: 'Heart Trouble' },
              { key: 'frequentCold', label: 'Frequent Cold' },
              { key: 'stomachUpsets', label: 'Stomach Upsets' },
              { key: 'faintingSpells', label: 'Fainting Spells' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={medicalConditions.${key}}
                  checked={formData.medicalConditions[key]}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 opacity-0">
            Continued
          </label>
          <div className="space-y-2">
            {[
              { key: 'urinaryProblems', label: 'Urinary Problems' },
              { key: 'skinRash', label: 'Problems with skin rash' },
              { key: 'soiling', label: 'Problems with soiling' },
              { key: 'soreThroats', label: 'Frequent sore throats' },
              { key: 'earInfection', label: 'Frequent ear infection' },
              { key: 'noneOfAbove', label: 'None of the above' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={medicalConditions.${key}}
                  checked={formData.medicalConditions[key]}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Past Diseases Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Has your child had any of the following diseases? (Please check those that apply){' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              { key: 'mumps', label: 'Mumps' },
              { key: 'chickenpox', label: 'Chickenpox' },
              { key: 'hepatitis', label: 'Hepatitis' },
              { key: 'scarletFever', label: 'Scarlet Fever' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={pastDiseases.${key}}
                  checked={formData.pastDiseases[key]}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 opacity-0">
            Continued
          </label>
          <div className="space-y-2">
            {[
              { key: 'tuberculosis', label: 'Tuberculosis' },
              { key: 'measles', label: 'Measles' },
              { key: 'noneOfAbove', label: 'None of the above' }
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={pastDiseases.${key}}
                  checked={formData.pastDiseases[key]}
                  onChange={handleInputChange}
                  className="mr-2 w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Past Conditions */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Conditions/diseases that your child may have had in the past.
        </label>
        <input
          type="text"
          name="pastConditions"
          value={formData.pastConditions}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Regular Medication */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Does your child take any medication on a regular basis?
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="takesRegularMedication"
                value="Yes"
                checked={formData.takesRegularMedication === 'Yes'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="takesRegularMedication"
                value="No"
                checked={formData.takesRegularMedication === 'No'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            If yes please explain
          </label>
          <input
            type="text"
            name="medicationExplanation"
            value={formData.medicationExplanation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={formData.takesRegularMedication !== 'Yes'}
          />
        </div>
      </div>

      {/* Allergies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Does your child have any allergies?
          </label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasAllergies"
                value="Yes"
                checked={formData.hasAllergies === 'Yes'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasAllergies"
                value="No"
                checked={formData.hasAllergies === 'No'}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-blue-600 cursor-pointer"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Please list all allergies if any.
          </label>
          <input
            type="text"
            name="allergiesList"
            value={formData.allergiesList}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={formData.hasAllergies !== 'Yes'}
          />
        </div>
      </div>

      {/* Permission Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
        <p className="text-sm text-gray-700 font-semibold">
          By signing this health form, you are giving permission to the Al-Rasheed Academy to
          release the medical information to medical personnel in an emergency.
        </p>
      </div>

      {/* Parent Signature */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Parent's Signature <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="healthFormSignature"
          value={formData.healthFormSignature}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
};

export default HealthForm;