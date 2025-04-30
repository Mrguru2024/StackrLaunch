'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Calculate Your Potential
            <span className="text-primary"> Savings</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See how much you could save with StackZen's AI-powered financial automation.
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Financial Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                  <TabsTrigger value="annual">Annual View</TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Average Monthly Income</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[monthlyIncome]}
                          onValueChange={([value]) => setMonthlyIncome(value)}
                          min={1000}
                          max={20000}
                          step={100}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                          className="w-32"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Income Variability (%)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[incomeVariability]}
                          onValueChange={([value]) => setIncomeVariability(value)}
                          min={0}
                          max={100}
                          step={5}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={incomeVariability}
                          onChange={(e) => setIncomeVariability(Number(e.target.value))}
                          className="w-32"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Monthly Expenses</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[monthlyExpenses]}
                          onValueChange={([value]) => setMonthlyExpenses(value)}
                          min={500}
                          max={10000}
                          step={100}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={monthlyExpenses}
                          onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Estimated Monthly Savings</p>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(calculateSavings() / 12)}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="annual" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Average Annual Income</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[monthlyIncome * 12]}
                          onValueChange={([value]) => setMonthlyIncome(value / 12)}
                          min={12000}
                          max={240000}
                          step={1000}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={monthlyIncome * 12}
                          onChange={(e) => setMonthlyIncome(Number(e.target.value) / 12)}
                          className="w-32"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Income Variability (%)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[incomeVariability]}
                          onValueChange={([value]) => setIncomeVariability(value)}
                          min={0}
                          max={100}
                          step={5}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={incomeVariability}
                          onChange={(e) => setIncomeVariability(Number(e.target.value))}
                          className="w-32"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Annual Expenses</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[monthlyExpenses * 12]}
                          onValueChange={([value]) => setMonthlyExpenses(value / 12)}
                          min={6000}
                          max={120000}
                          step={1000}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={monthlyExpenses * 12}
                          onChange={(e) => setMonthlyExpenses(Number(e.target.value) / 12)}
                          className="w-32"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Estimated Annual Savings</p>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(calculateSavings())}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
