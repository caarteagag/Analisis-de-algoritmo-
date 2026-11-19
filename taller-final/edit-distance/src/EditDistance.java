//Class of methods to solve the edit distance problem, LeetCode 72
//the class is renamed to Solution when the code is submited to LeetCode
public class EditDistance {

    //Finds the minimum number of operations (insert, delete, replace) to turn word1 into word2
    public int minDistance(String word1, String word2) {
        int[][] dp = buildTable(word1, word2);
        return dp[word1.length()][word2.length()];
    }

    //dp[i][j] = edits to turn word1[0..i) into word2[0..j)
    private int[][] buildTable(String word1, String word2){
        int n = word1.length();
        int m = word2.length();
        int[][] dp = new int[n + 1][m + 1];
        //turning a prefix into the empty word takes deleting all its letters
        for(int i = 0; i <= n; i++){
            dp[i][0] = i;
        }
        //turning the empty word into a prefix takes inserting all its letters
        for(int j = 0; j <= m; j++){
            dp[0][j] = j;
        }
        for(int i = 1; i <= n; i++){
            for(int j = 1; j <= m; j++){
                if(word1.charAt(i - 1) == word2.charAt(j - 1)){
                    //same last letter, it costs nothing and the rest is already solved
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    //delete, insert or replace, plus the edit just made
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }
        return dp;
    }

    //Smallest of three edit counts
    private int min(int a, int b, int c){
        int smallest = a;
        if(b < smallest){
            smallest = b;
        }
        if(c < smallest){
            smallest = c;
        }
        return smallest;
    }

}
