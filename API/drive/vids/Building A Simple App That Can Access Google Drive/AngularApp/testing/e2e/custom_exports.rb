


class CustomExports
  def initialize()  
  end  
  def number_parse dim  
    dim = dim.split "p"
    dim = dim[0]
    dim = dim.to_i
    return dim 
  end  
  def get_text_width devObj
    canvas = devObj[:canvas]
    ctx = canvas.getContext %{2d}
    ctx.font = devObj[:font]  
    ctx.measureText(devObj[:elementText]).width;    
  end
end  