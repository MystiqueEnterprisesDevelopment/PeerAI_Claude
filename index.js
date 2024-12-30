import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LottoGenerator = () => {
  const [numbers, setNumbers] = useState([]);
  const [gameType, setGameType] = useState('powerball');

  const games = {
    powerball: { main: { count: 5, max: 69 }, special: { count: 1, max: 26 }, name: 'Powerball' },
    megamillions: { main: { count: 5, max: 70 }, special: { count: 1, max: 25 }, name: 'Mega Millions' },
    basic: { main: { count: 6, max: 49 }, special: { count: 0, max: 0 }, name: 'Basic Lottery' }
  };

  const generateNumbers = () => {
    const game = games[gameType];
    const mainNumbers = [];
    const specialNumbers = [];

    // Generate main numbers
    while (mainNumbers.length < game.main.count) {
      const num = Math.floor(Math.random() * game.main.max) + 1;
      if (!mainNumbers.includes(num)) {
        mainNumbers.push(num);
      }
    }

    // Generate special numbers if needed
    if (game.special.count > 0) {
      while (specialNumbers.length < game.special.count) {
        const num = Math.floor(Math.random() * game.special.max) + 1;
        if (!specialNumbers.includes(num)) {
          specialNumbers.push(num);
        }
      }
    }

    setNumbers({
      main: mainNumbers.sort((a, b) => a - b),
      special: specialNumbers
    });
  };

  const NumberBall = ({ number, isSpecial }) => (
    <div className={`
      w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
      ${isSpecial ? 'bg-red-500' : 'bg-blue-500'} 
      text-white shadow-lg animate-bounce
    `}>
      {number}
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Lottery Number Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <Select value={gameType} onValueChange={setGameType}>
              <SelectTrigger>
                <SelectValue placeholder="Select lottery type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="powerball">Powerball</SelectItem>
                <SelectItem value="megamillions">Mega Millions</SelectItem>
                <SelectItem value="basic">Basic Lottery (6/49)</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={generateNumbers}
              className="w-full"
            >
              Generate Numbers
            </Button>
          </div>

          {numbers.main && (
            <div className="mt-6">
              <h3 className="text-center mb-4 text-lg font-semibold">
                {games[gameType].name} Numbers
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {numbers.main.map((num, i) => (
                  <NumberBall key={`main-${i}`} number={num} isSpecial={false} />
                ))}
                {numbers.special?.map((num, i) => (
                  <NumberBall key={`special-${i}`} number={num} isSpecial={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LottoGenerator;