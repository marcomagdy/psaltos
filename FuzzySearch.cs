using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Psaltos
{
    public struct Cell
    {
        public int score;
        public bool isMatch;
    }

    public class FuzzySearch
    {

        public static int CalculateNeedlemanWunschScore(string s, string t)
        {
            Cell[,] d = new Cell[s.Length + 1, t.Length + 1];
            d[0, 0].score = 0;
            for (int i = 1; i <= s.Length; i++)
            {
                d[i, 0].score = d[i - 1, 0].score - 1;
            }
            for (int j = 1; j <= t.Length; j++)
            {
                d[0, j].score = d[0, j - 1].score - 1;
            }
            for (int i = 1; i <= s.Length; i++)
            {
                for (int j = 1; j <= t.Length; j++)
                {
                    int score = 0;
                    int gap = -1;
                    if (s[i - 1] == t[j - 1])
                    {
                        d[i, j].isMatch = true;
                        score = 5;
                        // If the previous cell was a match, then we add a bonus 100 points to the score.
                        // This gives consecutive matches a higher score than non-consecutive matches.
                        if (d[i - 1, j - 1].isMatch)
                        {
                            score += 100;
                        }
                    }
                    else
                    {
                        d[i, j].isMatch = false;
                        // Penalize new gaps more than single linear gaps.
                        // We determine "new" gaps by checking if the previous cell was a match.
                        if (d[i - 1, j - 1].isMatch)
                        {
                            gap *= 4;
                        }
                    }
                    d[i, j].score = Math.Max(Math.Max(d[i - 1, j].score + gap, d[i, j - 1].score + gap), d[i - 1, j - 1].score + score);
                }
            }
            return d[s.Length, t.Length].score;
        }
    }
}
