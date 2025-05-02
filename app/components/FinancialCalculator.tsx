'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Card } from '../../components/ui/card';
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
                      {formatCurrency(monthlyIncome)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={1000}
                      max={20000}
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
                    <span className="text-white text-lg font-medium">{incomeVariability}%</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={incomeVariability}
                      onChange={(e) => setIncomeVariability(Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={0}
                      max={100}
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
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(monthlyExpenses)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={500}
                      max={10000}
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

            <TabsContent value="annual" className="space-y-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-white text-lg">Annual Income</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(monthlyIncome * 12)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyIncome * 12}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value) / 12)}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={12000}
                      max={240000}
                    />
                    <Slider
                      value={[monthlyIncome * 12]}
                      onValueChange={([value]) => setMonthlyIncome(value / 12)}
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
                    <span className="text-white text-lg font-medium">{incomeVariability}%</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={incomeVariability}
                      onChange={(e) => setIncomeVariability(Number(e.target.value))}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={0}
                      max={100}
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
                    <Label className="text-white text-lg">Annual Expenses</Label>
                    <span className="text-white text-lg font-medium">
                      {formatCurrency(monthlyExpenses * 12)}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      value={monthlyExpenses * 12}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value) / 12)}
                      className="w-24 text-white bg-[#2C4B5D] border-white/20 focus:border-white/40"
                      min={6000}
                      max={120000}
                    />
                    <Slider
                      value={[monthlyExpenses * 12]}
                      onValueChange={([value]) => setMonthlyExpenses(value / 12)}
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
