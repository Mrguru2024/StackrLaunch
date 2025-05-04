'use client';

import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Calculator, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';

interface CalculatorState {
  monthlyIncome: number;
  incomeVariability: number;
  monthlyExpenses: number;
}

const DEFAULT_STATE: CalculatorState = {
  monthlyIncome: 5000,
  incomeVariability: 30,
  monthlyExpenses: 3000,
};

export default function FinancialCalculator() {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE);
  const [activeTab, setActiveTab] = useState('monthly');

  const handleReset = () => {
    setState(DEFAULT_STATE);
  };

  const calculateSavings = () => {
    const baseSavings = state.monthlyIncome - state.monthlyExpenses;
    const variabilityFactor = 1 - state.incomeVariability / 100;
    const annualSavings = baseSavings * 12 * variabilityFactor;
    const hiddenFees = state.monthlyIncome * 0.02 * 12; // Assuming 2% in hidden fees
    return Math.round(annualSavings + hiddenFees);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (field: keyof CalculatorState, value: number) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-[#1a2634]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#233D4D] rounded-xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calculator className="h-6 w-6 text-white mr-2" />
              <h2 className="text-2xl font-bold text-white">Financial Calculator</h2>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-[#2C4B5D] text-white border-[#2C4B5D] hover:bg-[#3A5D6F] hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-[#2C4B5D] data-[state=active]:text-white text-white/70 hover:text-white"
              >
                Monthly View
              </TabsTrigger>
              <TabsTrigger
                value="annual"
                className="data-[state=active]:bg-[#2C4B5D] data-[state=active]:text-white text-white/70 hover:text-white"
              >
                Annual View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Average Monthly Income</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(state.monthlyIncome)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.monthlyIncome}
                      onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={1000}
                      max={20000}
                    />
                    <Slider
                      value={[state.monthlyIncome]}
                      onValueChange={([value]) => handleInputChange('monthlyIncome', value)}
                      min={1000}
                      max={20000}
                      step={100}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Income Variability (%)</Label>
                    <span className="text-white text-lg font-medium">
                      {state.incomeVariability}%
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.incomeVariability}
                      onChange={(e) =>
                        handleInputChange('incomeVariability', Number(e.target.value))
                      }
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={0}
                      max={100}
                    />
                    <Slider
                      value={[state.incomeVariability]}
                      onValueChange={([value]) => handleInputChange('incomeVariability', value)}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Monthly Expenses</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(state.monthlyExpenses)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.monthlyExpenses}
                      onChange={(e) => handleInputChange('monthlyExpenses', Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={500}
                      max={10000}
                    />
                    <Slider
                      value={[state.monthlyExpenses]}
                      onValueChange={([value]) => handleInputChange('monthlyExpenses', value)}
                      min={500}
                      max={10000}
                      step={100}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Estimated Monthly Savings</h3>
                  <p className="text-6xl font-bold text-white">
                    {formatCurrency(calculateSavings() / 12)}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="annual" className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Annual Income</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(state.monthlyIncome * 12)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.monthlyIncome * 12}
                      onChange={(e) =>
                        handleInputChange('monthlyIncome', Number(e.target.value) / 12)
                      }
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={12000}
                      max={240000}
                    />
                    <Slider
                      value={[state.monthlyIncome * 12]}
                      onValueChange={([value]) => handleInputChange('monthlyIncome', value / 12)}
                      min={12000}
                      max={240000}
                      step={1000}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Income Variability (%)</Label>
                    <span className="text-white text-lg font-medium">
                      {state.incomeVariability}%
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.incomeVariability}
                      onChange={(e) =>
                        handleInputChange('incomeVariability', Number(e.target.value))
                      }
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={0}
                      max={100}
                    />
                    <Slider
                      value={[state.incomeVariability]}
                      onValueChange={([value]) => handleInputChange('incomeVariability', value)}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Annual Expenses</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(state.monthlyExpenses * 12)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={state.monthlyExpenses * 12}
                      onChange={(e) =>
                        handleInputChange('monthlyExpenses', Number(e.target.value) / 12)
                      }
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={6000}
                      max={120000}
                    />
                    <Slider
                      value={[state.monthlyExpenses * 12]}
                      onValueChange={([value]) => handleInputChange('monthlyExpenses', value / 12)}
                      min={6000}
                      max={120000}
                      step={1000}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Estimated Annual Savings</h3>
                  <p className="text-6xl font-bold text-white">
                    {formatCurrency(calculateSavings())}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
