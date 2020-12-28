import scala.io.Source
object Day1p2
{
  def main(args: Array[String]): Unit =
  {
    val filename = "input1.txt"
    var tot: Int=0
    for (mod <- Source.fromFile(filename).getLines) 
    {
      tot+=CalculateFuelMass(mod.toInt)-mod.toInt
    }
    println(s"Total mass needed = $tot")

  }
  
  def CalculateFuelMass(mass: Int): Int =
  {
    if (mass<=0)
      0
    else
    {
      println(mass)
      mass + CalculateFuelMass(mass/3-2).toInt
    }
  }
}

