'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../../components/ui/slider';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Calculator } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function FinancialCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [incomeVariability, setIncomeVariability] = useState(30);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);

  const calculateSavings = () => {
    const baseSavings = monthlyIncome - monthlyExpenses;
    const variabilityFactor = 1 - incomeVariability / 100;
    const annualSavings = baseSavings * 12 * variabilityFactor;
    const hiddenFees = monthlyIncome * 0.02 * 12; // Assuming 2% in hidden fees
    return Math.round(annualSavings + hiddenFees);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-[#1a2634]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#233D4D] rounded-xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-white mr-2" />
            <h2 className="text-2xl font-bold text-white">Financial Calculator</h2>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1a2634]">
              <TabsTrigger value="monthly" className="text-white data-[state=active]:bg-[#2C4B5D]">
                Monthly View
              </TabsTrigger>
              <TabsTrigger value="annual" className="text-white data-[state=active]:bg-[#2C4B5D]">
                Annual View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Average Monthly Income</Label>
                    <span className="text-white text-lg">{formatCurrency(monthlyIncome)}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-24 text-white bg-[#1a2634] border-white/20"
                    />
                    <Slider
                      value={[monthlyIncome]}
                      onValueChange={([value]) => setMonthlyIncome(value)}
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
                    <span className="text-white text-lg">{incomeVariability}%</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={incomeVariability}
                      onChange={(e) => setIncomeVariability(Number(e.target.value))}
                      className="w-24 text-white bg-[#1a2634] border-white/20"
                    />
                    <Slider
                      value={[incomeVariability]}
                      onValueChange={([value]) => setIncomeVariability(value)}
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
                    <span className="text-white text-lg">{formatCurrency(monthlyExpenses)}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-24 text-white bg-[#1a2634] border-white/20"
                    />
                    <Slider
                      value={[monthlyExpenses]}
                      onValueChange={([value]) => setMonthlyExpenses(value)}
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

            <TabsContent value="annual" className="space-y-6">
              {/* Annual view content here */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
