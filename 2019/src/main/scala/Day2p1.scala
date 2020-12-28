import org.apache.spark.sql.SparkSession
import scala.collection.JavaConverters._
object Day2p1 {
  def main(args: Array[String]): Unit = {
    val sc = SparkSession
      .builder()
      .appName("My second day")
      .config("spark.master", "local")
      .getOrCreate();
      import sc.implicits._
      val fileName = "src/main/resources/input2.txt"
      var fileData = sc.read.textFile(fileName)
      val prog = fileData.map(_.split(',').map(_.trim().toInt))
      val progArray : scala.collection.mutable.Buffer[Int] =
        prog.collectAsList.asScala.flatMap(_.toList);
      println("BEFORE:")
      println(progArray)
      var noun: Int = 0
      var verb: Int = 0
      while (noun != -1 )
      {
        print("noun: ")
        noun = scala.io.StdIn.readInt()
        print("verb: ")
        verb = scala.io.StdIn.readInt()
        var res: scala.collection.mutable.Buffer[Int] = OpCompute(prog=progArray.clone(), noun=noun, verb=verb)
        println("AFTER:")
        println(res)
      }
      //
      //println(progArray)
      sc.stop()
  }

  def OpCompute(prog: scala.collection.mutable.Buffer[Int], noun: Int, verb: Int): scala.collection.mutable.Buffer[Int] = {
    prog(1)=noun
    prog(2)=verb
    var pc: Int = 0
    while (prog(pc)!=99)
    {
      if (prog(pc)==1)
      {
        prog(prog(pc+3))=prog(prog(pc+1))+prog(prog(pc+2))
      }
      else if (prog(pc)==2)
      {
        prog(prog(pc+3))=prog(prog(pc+1))*prog(prog(pc+2))
      }
      pc+=4
    }
    prog
  }
}
