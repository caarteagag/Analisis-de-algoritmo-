public class Main {
    public static void main(String[] args) throws Exception {
        EditDistance editDistance = new EditDistance();
        //test cases taken from the examples of the LeetCode problem
        System.out.println(editDistance.minDistance("horse", "ros"));
        System.out.println(editDistance.minDistance("intention", "execution"));
    }
}
