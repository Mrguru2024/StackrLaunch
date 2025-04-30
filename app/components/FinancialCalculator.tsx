'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleDollarSign, TrendingUp, PiggyBank, Calculator } from 'lucide-react';

export default function FinancialCalculator() {
  // Calculator state
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState(3500);
  const [savingsRate, setSavingsRate] = useState(10);
  const [investmentReturn, setInvestmentReturn] = useState(7);
  const [years, setYears] = useState(10);
  const [calculatorTab, setCalculatorTab] = useState('savings');

  // Results
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [yearlyAutomatedSavings, setYearlyAutomatedSavings] = useState(0);
  const [projectedSavings, setProjectedSavings] = useState(0);
  const [stackrSavings, setStackrSavings] = useState(0);
  const [additionalSavings, setAdditionalSavings] = useState(0);

  // Calculate results whenever inputs change
  useEffect(() => {
    // Calculate basic monthly savings (income - expenses)
    const availableMonthly = Math.max(0, income - expenses);
    const savings = (availableMonthly * savingsRate) / 100;
    setMonthlySavings(savings);

    // Calculate yearly automated savings
    const yearlySavings = savings * 12;
    setYearlyAutomatedSavings(yearlySavings);

    // Calculate projected savings over time without compounding
    const simpleSavings = yearlySavings * years;

    // Calculate projected savings with Stackr's smart investments (with compounding)
    let compoundSavings = 0;
    const yearlyContribution = savings * 12;
    for (let i = 0; i < years; i++) {
      compoundSavings = (compoundSavings + yearlyContribution) * (1 + investmentReturn / 100);
    }

    setProjectedSavings(simpleSavings);
    setStackrSavings(compoundSavings);
    setAdditionalSavings(compoundSavings - simpleSavings);
  }, [income, expenses, savingsRate, investmentReturn, years]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See How Much You Could Save</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our calculator to see how Stackr can help automate your finances and build wealth
            over time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8 border-b">
                <div className="flex items-center mb-4">
                  <Calculator className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-xl font-bold">Financial Calculator</h3>
                </div>

                <Tabs value={calculatorTab} onValueChange={setCalculatorTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="savings">Savings Calculator</TabsTrigger>
                    <TabsTrigger value="investment">Investment Projections</TabsTrigger>
                  </TabsList>

                  <TabsContent value="savings" className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="monthly-income">Monthly Income</Label>
                          <span className="text-sm text-gray-500">{formatCurrency(income)}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="monthly-income"
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            min={0}
                            max={50000}
                            className="w-24"
                          />
                          <Slider
                            value={[income]}
                            onValueChange={(values) => setIncome(values[0])}
                            min={0}
                            max={15000}
                            step={100}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
                          <span className="text-sm text-gray-500">{formatCurrency(expenses)}</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="monthly-expenses"
                            type="number"
                            value={expenses}
                            onChange={(e) => setExpenses(Number(e.target.value))}
                            min={0}
                            max={income}
                            className="w-24"
                          />
                          <Slider
                            value={[expenses]}
                            onValueChange={(values) => setExpenses(values[0])}
                            min={0}
                            max={income}
                            step={100}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="savings-rate">Target Savings Rate</Label>
                          <span className="text-sm text-gray-500">{savingsRate}%</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="savings-rate"
                            type="number"
                            value={savingsRate}
                            onChange={(e) => setSavingsRate(Number(e.target.value))}
                            min={1}
                            max={100}
                            className="w-24"
                          />
                          <Slider
                            value={[savingsRate]}
                            onValueChange={(values) => setSavingsRate(values[0])}
                            min={1}
                            max={50}
                            step={1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="investment" className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="investment-return">Expected Annual Return</Label>
                          <span className="text-sm text-gray-500">{investmentReturn}%</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="investment-return"
                            type="number"
                            value={investmentReturn}
                            onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                            min={1}
                            max={12}
                            className="w-24"
                          />
                          <Slider
                            value={[investmentReturn]}
                            onValueChange={(values) => setInvestmentReturn(values[0])}
                            min={1}
                            max={12}
                            step={0.5}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                          <span className="text-sm text-gray-500">{years} years</span>
                        </div>
                        <div className="flex gap-4 items-center">
                          <Input
                            id="time-horizon"
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            min={1}
                            max={40}
                            className="w-24"
                          />
                          <Slider
                            value={[years]}
                            onValueChange={(values) => setYears(values[0])}
                            min={1}
                            max={40}
                            step={1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="p-6 md:p-8">
                <h4 className="font-semibold text-lg mb-4">Your Monthly Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <CircleDollarSign className="h-4 w-4 mr-2 text-green-600" />
                        Available for Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatCurrency(income - expenses)}</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <PiggyBank className="h-4 w-4 mr-2 text-primary" />
                        Automated Savings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{formatCurrency(monthlySavings)}</p>
                      <p className="text-sm text-gray-500">per month</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="shadow-lg h-full">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Your Projected Growth
                  </CardTitle>
                  <CardDescription className="text-primary-100">
                    See how your savings could grow over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Yearly Automated Savings
                      </h5>
                      <p className="text-2xl font-bold">{formatCurrency(yearlyAutomatedSavings)}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        After {years} Years Without Stackr
                      </h5>
                      <p className="text-2xl font-bold">{formatCurrency(projectedSavings)}</p>
                      <p className="text-sm text-gray-500">
                        Simple savings without investment growth
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">
                        After {years} Years With Stackr
                      </h5>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(stackrSavings)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Automated savings with smart investments
                      </p>

                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-sm font-medium flex items-center text-green-700">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Extra {formatCurrency(additionalSavings)} with Stackr
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <Button
                    className="w-full shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-200"
                    data-tally-open="3NO0eG"
                    data-tally-width="500"
                    data-tally-emoji-text="👋"
                    data-tally-emoji-animation="wave"
                  >
                    Join Waitlist to Start Saving
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
