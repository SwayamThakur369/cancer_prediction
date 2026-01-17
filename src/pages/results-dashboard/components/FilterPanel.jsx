import { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterPanel = ({ onFilterChange, onExport }) => {
  const [filters, setFilters] = useState({
    cancerType: 'all',
    dateRange: '30days',
    riskLevel: 'all'
  });

  const cancerTypeOptions = [
    { value: 'all', label: 'All Cancer Types' },
    { value: 'breast', label: 'Breast Cancer' },
    { value: 'lung', label: 'Lung Cancer' },
    { value: 'prostate', label: 'Prostate Cancer' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'high', label: 'High Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'low', label: 'Low Risk' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      cancerType: 'all',
      dateRange: '30days',
      riskLevel: 'all'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Cancer Type"
            options={cancerTypeOptions}
            value={filters?.cancerType}
            onChange={(value) => handleFilterChange('cancerType', value)}
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => handleFilterChange('riskLevel', value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          
          <Button
            variant="default"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;